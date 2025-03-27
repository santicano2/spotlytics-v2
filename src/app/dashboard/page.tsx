"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { redirect } from "next/navigation";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState<string>("medium_term"); // Default: 6 meses

  useEffect(() => {
    if (session?.accessToken) {
      fetchTopTracks();
      fetchTopArtists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, timeRange]);

  const fetchTopTracks = async () => {
    const res = await fetch(
      `/api/top-tracks?accessToken=${session?.accessToken}&timeRange=${timeRange}`
    );
    const data = await res.json();
    setTopTracks(data.items);
  };

  const fetchTopArtists = async () => {
    const res = await fetch(
      `/api/top-artists?accessToken=${session?.accessToken}&timeRange=${timeRange}`
    );
    const data = await res.json();
    setTopArtists(data.items);
  };

  if (!session) {
    redirect("/");
  }

  return (
    <div className="p-6 bg-[#191414] text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tus estadísticas de Spotify</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>

      <label className="mr-2">Selecciona un período de tiempo:</label>
      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="px-4 py-2 border rounded-lg mb-6"
      >
        <option value="short_term" className="bg-[#191414] text-white">
          Últimas 4 semanas
        </option>
        <option value="medium_term" className="bg-[#191414] text-white">
          Últimos 6 meses
        </option>
        <option value="long_term" className="bg-[#191414] text-white">
          Todo el tiempo
        </option>
      </select>

      <div>
        <h2 className="text-xl font-semibold">Tus canciones más escuchadas</h2>
        <ul className="mt-4">
          {topTracks.map((track) => (
            <li key={track.id} className="flex items-center mb-4">
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                width={64}
                height={64}
                className="rounded-md"
              />
              <span className="ml-4">
                {track.name} - {track.artists[0].name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Tus artistas más escuchados</h2>
        <ul className="mt-4">
          {topArtists.map((artist) => (
            <li key={artist.id} className="flex items-center mb-4">
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                width={64}
                height={64}
                className="rounded-md"
              />
              <span className="ml-4">{artist.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
