'use client';
import { Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import Login from './Login';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

interface MoodData {
  [day: string]: number;
}

interface MonthData {
  [month: string]: MoodData;
}

interface YearData {
  [year: string]: MonthData;
}

interface Statuses {
  num_days: number;
  average_mood: number;
  time_remaining: string;
}

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState<YearData>({});
  const now = new Date();

  function countValues(): { num_days: number; average_mood: number } {
    let totalNumberOfDays = 0;
    let sumMoods = 0;

    for (const year in data) {
      for (const month in data[year]) {
        for (const day in data[year][month]) {
          const daysMood = data[year][month][day];
          totalNumberOfDays++;
          sumMoods += daysMood;
        }
      }
    }

    return {
      num_days: totalNumberOfDays,
      average_mood: totalNumberOfDays ? sumMoods / totalNumberOfDays : 0,
    };
  }

  const { num_days, average_mood } = countValues(); // Destructure the countValues result

  const statuses: Statuses = {
    num_days,
    average_mood,
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood: number) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj } as YearData;
      if (!newData[year]) {
        newData[year] = {};
      }
      if (!newData[year][month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;
      // Update the current state
      setData(newData);
      // Update the global state
      setUserDataObj(newData);
      // Update Firebase
      const docRef = doc(db, 'users', currentUser!.uid); // Use non-null assertion
      await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      if (err instanceof Error) {
        console.log('Failed to set data: ', err.message);
      } else {
        console.log('An unexpected error occurred: ', err);
      }
    }
  }

  const moods: { [key: string]: string } = {
    '&*@#$': '😭',
    'Sad': '🥲',
    'Existing': '😶',
    'Good': '😊',
    'Elated': '😍',
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg">
        {Object.keys(statuses).map((status, statusIndex) => (
          <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2">
            <p className="font-medium capitalize text-xs sm:text-sm truncate">
              {status.replaceAll('_', ' ')}
            </p>
            <p className={'text-base sm:text-lg truncate ' + fugaz.className}>
              {statuses[status as keyof Statuses]} {/* Cast status to keyof Statuses */}
              {status === 'num_days' ? ' 🔥' : ''}
            </p>
          </div>
        ))}
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => (
          <button
            key={moodIndex}
            onClick={() => handleSetMood(moodIndex + 1)}
            className="p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1"
          >
            <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
            <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>
              {mood}
            </p>
          </button>
        ))}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} demo={false} /> {/* Pass the demo prop */}
    </div>
  );
}
