import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/use-audio";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Using a cute, royalty-free track
const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_496092e032.mp3?filename=lo-fi-chill-hip-hop-123896.mp3";

export function MusicPlayer() {
  const { playing, toggle, volume, setVolume } = useAudio(AUDIO_URL);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-pink-100 flex items-center gap-2 w-32"
          >
            <Volume2 className="w-4 h-4 text-primary" />
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(val) => setVolume(val[0] / 100)}
              className="w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggle}
        className={`
          w-14 h-14 rounded-full shadow-xl flex items-center justify-center
          transition-colors duration-300 relative
          ${playing ? "bg-primary text-white" : "bg-white text-primary"}
        `}
      >
        {playing ? (
          <div className="relative">
            <Music className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}
