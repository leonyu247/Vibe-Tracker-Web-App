"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, isConfigured } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { WeekendProject, createDefaultWeekends } from "@/lib/types";

export function useWeekends() {
  const { user } = useAuth();
  const [weekends, setWeekends] = useState<WeekendProject[]>(createDefaultWeekends());
  const [loading, setLoading] = useState(true);

  // Load weekends from Firestore
  useEffect(() => {
    if (!user || !isConfigured || !db) {
      setWeekends(createDefaultWeekends());
      setLoading(false);
      return;
    }

    const loadWeekends = async () => {
      setLoading(true);
      const docRef = doc(db!, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWeekends(docSnap.data().weekends as WeekendProject[]);
      } else {
        const defaults = createDefaultWeekends();
        await setDoc(docRef, { weekends: defaults });
        setWeekends(defaults);
      }
      setLoading(false);
    };

    loadWeekends();
  }, [user]);

  // Save weekends to Firestore
  const saveWeekends = useCallback(
    async (updated: WeekendProject[]) => {
      setWeekends(updated);
      if (user && isConfigured && db) {
        const docRef = doc(db!, "users", user.uid);
        await setDoc(docRef, { weekends: updated }, { merge: true });
      }
    },
    [user]
  );

  const updateWeekend = useCallback(
    (id: number, changes: Partial<WeekendProject>) => {
      const updated = weekends.map((w) =>
        w.id === id ? { ...w, ...changes } : w
      );
      saveWeekends(updated);
    },
    [weekends, saveWeekends]
  );

  const completedCount = weekends.filter((w) => w.completed).length;
  const totalTime = weekends.reduce((sum, w) => sum + w.timeSpent, 0);
  const progressPercent = (completedCount / 10) * 100;

  const suggestNext = useCallback((): WeekendProject | null => {
    // Find the first incomplete weekend
    const incomplete = weekends.filter((w) => !w.completed);
    if (incomplete.length === 0) return null;

    // Prioritize weekends with most time invested but not yet complete
    const sorted = [...incomplete].sort((a, b) => b.timeSpent - a.timeSpent);
    // If any have time invested, suggest the one with the most (they've started)
    if (sorted[0].timeSpent > 0) return sorted[0];
    // Otherwise suggest the first incomplete
    return incomplete[0];
  }, [weekends]);

  return {
    weekends,
    loading,
    updateWeekend,
    completedCount,
    totalTime,
    progressPercent,
    suggestNext,
  };
}
