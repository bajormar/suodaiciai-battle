import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { HeartIcon } from "../components/Heart.icon";

const inter = Inter({ subsets: ["latin"] });

const maxHealthPoints = 3;

const nepatogusKlausimaiAction = {
  title: "Nepatogus klausimai",
  damage: 2,
};

const apsilankytiLigoninejeAction = {
  title: "Apsilankyti ligonineje",
  damage: 1,
};

const actions = [nepatogusKlausimaiAction, apsilankytiLigoninejeAction];

export default function Home() {
  const [playerState, setPlayerState] = useState({
    healthPoints: 3,
    actions: [nepatogusKlausimaiAction, apsilankytiLigoninejeAction],
  });
  const [opponentState, setOpponentState] = useState({
    healthPoints: 3,
    actions: [nepatogusKlausimaiAction, apsilankytiLigoninejeAction],
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-2">
        <div>Siegel</div>
        <div className="flex items-center gap-1">
          {Array.from({ length: maxHealthPoints }).map((_, i) => (
            <HeartIcon key={i} filled={i < opponentState.healthPoints} />
          ))}
        </div>
      </div>

      <div>
        <div>Laurynas</div>
        <div className="flex items-center gap-1">
          {Array.from({ length: maxHealthPoints }).map((_, i) => (
            <HeartIcon key={i} filled={i < playerState.healthPoints} />
          ))}
        </div>
        <div className="flex items-center gap-1">
          {playerState.actions.map((action, i) => (
            <button
              type="button"
              key={i}
              className="border p-3 bg-amber-50 hover:bg-amber-100"
              onClick={() => {
                const newActions = [...playerState.actions];
                newActions.splice(i, 1);

                setPlayerState({
                  ...playerState,
                  actions: newActions,
                });
                setOpponentState({
                  ...opponentState,
                  healthPoints: opponentState.healthPoints - action.damage,
                });

                setTimeout(() => {
                  if (opponentState.healthPoints - action.damage <= 0) {
                    alert("Iveikete Siegel");
                  }
                }, 1000);
              }}
            >
              <h6>{action.title}</h6>
              <div className="flex items-center gap-1">
                Zala: {action.damage} <HeartIcon filled={false} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
