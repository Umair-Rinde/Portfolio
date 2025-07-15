import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  color: string;
  image: string;
  description: string;
  experience: string;
}

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

const SkillModal = ({ skill, isOpen, onClose }: SkillModalProps) => {
    if (!skill) return null;
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden skill-modal-card">
          {/* Floating orbs background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-orb" />
            <div className="floating-orb" />
          </div>
  
          <DialogHeader className="relative z-10 px-8 pt-8">
            <div className="flex items-start gap-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg border border-foreground/10"
              >
                <img 
                  src={skill.image} 
                  alt={skill.name}
                  className="w-10 h-10 object-contain"
                />
              </motion.div>
              
              <div>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                  {skill.name}
                </DialogTitle>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-medium skill-modal-content">Proficiency:</span>
                  
                  <span className="text-sm font-medium text-primary">{skill.level}%</span>
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <div className="relative z-10 space-y-6 p-8">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="skill-modal-card p-6 rounded-xl border border-foreground/10"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Experience
              </h3>
              <p className="skill-modal-content leading-relaxed">{skill.experience}</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="skill-modal-card p-6 rounded-xl border border-foreground/10"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About {skill.name}
              </h3>
              <p className="skill-modal-content leading-relaxed">{skill.description}</p>
            </motion.div>
  
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <button 
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-pink-400 text-white font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Got it!
              </button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  export default SkillModal;