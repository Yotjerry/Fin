
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MoreHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { feedbackService, Feedback, FeedbackType, Review } from '../services/feedbackService';
import { useAuth } from '../contexts/AuthContext';

export default function SupportCenter() {
  const { user } = useAuth();
  
  // Feedback Form State
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('Correction');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Review Form State
  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // User's History
  const [myFeedbacks, setMyFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    if (user?.id) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (user?.id) {
      const data = await feedbackService.getFeedbacksByUser(user.id);
      setMyFeedbacks(data);
    }
  };

  const handleSendFeedback = async () => {
    if (!feedbackMsg.trim() || !user) return;
    setIsSubmittingFeedback(true);
    try {
      await feedbackService.submitFeedback({
        userId: user.id,
        userName: user.name || 'Utilisateur',
        type: feedbackType,
        message: feedbackMsg
      });
      setFeedbackSuccess(true);
      setFeedbackMsg('');
      loadHistory();
      setTimeout(() => setFeedbackSuccess(false), 3000);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleSendReview = async () => {
    if (rating === 0 || !user) return;
    setIsSubmittingReview(true);
    try {
      await feedbackService.submitReview({
        userId: user.id,
        userName: user.name || 'Utilisateur',
        rating,
        comment: reviewMsg
      });
      setReviewSuccess(true);
      setReviewMsg('');
      setRating(0);
      setTimeout(() => setReviewSuccess(false), 3000);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const categories: FeedbackType[] = ['Correction', 'Bug Technique', 'Suggestion', 'Autre'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Support & Corrections Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rapport & Corrections</span>
            <MoreHorizontal size={20} className="text-slate-200" />
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Support & Corrections</h3>
            <p className="text-slate-500 text-sm font-medium">Signalez un bug ou demandez une correction technique.</p>
          </div>

          <div className="mb-6">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Type de rapport</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFeedbackType(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                    feedbackType === cat 
                      ? 'bg-slate-900 text-white shadow-lg' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 mb-6">
            <textarea
              value={feedbackMsg}
              onChange={(e) => setFeedbackMsg(e.target.value)}
              placeholder="Détaillez le problème ou la correction demandée..."
              className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm font-medium text-slate-900 outline-none focus:border-slate-300 transition-all resize-none"
            />
          </div>

          <button
            onClick={handleSendFeedback}
            disabled={isSubmittingFeedback || !feedbackMsg.trim()}
            className="w-full bg-slate-500 hover:bg-slate-600 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-slate-200"
          >
            {feedbackSuccess ? (
              <>
                <CheckCircle2 size={18} />
                <span className="text-sm uppercase tracking-widest">Rapport Envoyé</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span className="text-sm uppercase tracking-widest font-black">Envoyer le rapport</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Évaluation Plateforme Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Évaluation Plateforme</span>
            <MoreHorizontal size={20} className="text-slate-200" />
          </div>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Votre Avis</h3>
              <p className="text-slate-500 text-sm font-medium">Notez votre expérience globale.</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className="transition-transform active:scale-125"
                >
                  <Star 
                    size={24} 
                    className={s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 mb-6">
            <textarea
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
              placeholder="Un commentaire sur la fluidité ou le design"
              className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm font-medium text-slate-900 outline-none focus:border-slate-300 transition-all resize-none"
            />
          </div>

          <button
            onClick={handleSendReview}
            disabled={isSubmittingReview || rating === 0}
            className="w-full bg-[#95ABC7] hover:bg-[#7D98B9] text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-50"
          >
            {reviewSuccess ? (
              <>
                <CheckCircle2 size={18} />
                <span className="text-sm uppercase tracking-widest">Avis Publié</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span className="text-sm uppercase tracking-widest">Publier mon avis</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Support Tracking Section */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Suivi de vos demandes</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Historique du support</p>
          </div>
        </div>

        {myFeedbacks.length === 0 ? (
          <div className="bg-slate-50 rounded-[2rem] p-12 text-center border border-dashed border-slate-200">
            <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold">Aucune demande de support pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myFeedbacks.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative group overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    f.status === 'Résolu' ? 'bg-emerald-50 text-emerald-600' :
                    f.status === 'En cours' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {f.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300">{new Date(f.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="mb-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{f.type}</p>
                  <p className="text-sm font-bold text-slate-900 line-clamp-2">{f.message}</p>
                </div>

                {f.adminNote && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Info size={12} className="text-fintrack-primary" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">Note Admin</span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 italic">"{f.adminNote}"</p>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-fintrack-primary transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
