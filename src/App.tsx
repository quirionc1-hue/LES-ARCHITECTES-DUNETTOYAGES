/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion } from 'motion/react';
import { Phone, Mail, Droplets, Sparkles, CheckCircle2, MapPin, ArrowRight, PlayCircle, Camera } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function AIGeneratedImage({ prompt, alt, className }: { prompt: string, alt: string, className: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>(localStorage.getItem(prompt));
  const [loading, setLoading] = useState(!imgSrc);

  useEffect(() => {
    if (imgSrc) return;
    
    async function generate() {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: prompt,
        });
        for (const part of response.candidates![0].content.parts) {
          if (part.inlineData) {
            const base64 = `data:image/jpeg;base64,${part.inlineData.data}`;
            setImgSrc(base64);
            localStorage.setItem(prompt, base64);
            setLoading(false);
            break;
          }
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
    generate();
  }, [prompt, imgSrc]);

  if (loading) {
    return <div className={`animate-pulse bg-slate-700 flex items-center justify-center ${className}`}><span className="text-slate-400 text-sm">Génération de l'image...</span></div>;
  }

  if (!imgSrc) {
    return <div className={`bg-slate-800 flex items-center justify-center ${className}`}><span className="text-slate-500 text-sm">Erreur de génération</span></div>;
  }

  return <img src={imgSrc} alt={alt} className={className} />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                LES ARCHITECTES<br /><span className="text-blue-600">DU NETTOYAGE</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#galerie" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Galerie</a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
              <a href="tel:8195273636" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                <Phone className="w-4 h-4" />
                (819) 527-3636
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50 -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Excellence & Propreté
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                La clarté parfaite pour vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">vitres et tapis</span>.
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Les Architectes du Nettoyage se spécialisent dans le lavage de vitres à l'eau pure et le nettoyage professionnel de tapis. Un service impeccable, résidentiel et commercial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="inline-flex justify-center items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40">
                  Demander une soumission
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#galerie" className="inline-flex justify-center items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Voir nos réalisations
                </a>
              </div>
              
              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Équipement de pointe
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Résultat garanti
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white/20"
            >
              <AIGeneratedImage 
                prompt="Photo très lumineuse et professionnelle d'un nettoyage de vitres à l'eau pure. On voit une brosse au bout d'une perche télescopique nettoyant une grande baie vitrée de maison. L'eau pure coule sur la vitre étincelante. Ciel bleu, grand soleil, haute résolution, style photoréaliste."
                alt="Lavage de vitres à l'eau pure" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl inline-flex items-center gap-4 shadow-lg">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Technologie à l'eau pure</p>
                    <p className="text-xs text-slate-500 font-medium">Zéro trace, 100% écologique</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Spécialités</h2>
            <p className="text-lg text-slate-600">Nous utilisons des techniques avancées pour garantir une propreté éclatante et durable pour votre propriété.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-slate-100 bg-slate-50 p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lavage de vitres à l'eau pure</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Notre système de filtration d'eau pure élimine 100% des minéraux et impuretés. Le résultat ? Des vitres qui sèchent sans aucune trace, restant propres plus longtemps. Idéal pour les fenêtres difficiles d'accès.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  Séchage sans traces ni résidus
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  Écologique (sans produits chimiques)
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  Nettoyage des cadres inclus
                </li>
              </ul>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group rounded-3xl border border-slate-100 bg-slate-50 p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lavage de tapis professionnel</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Redonnez vie à vos tapis et moquettes avec notre nettoyage en profondeur par extraction. Nous éliminons les taches tenaces, les allergènes et les mauvaises odeurs pour un intérieur sain.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  Élimination des taches et odeurs
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  Traitement anti-allergène
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  Séchage rapide
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galerie" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Réalisations</h2>
              <p className="text-slate-400 text-lg">Découvrez la qualité de notre travail en images et en vidéos. Des résultats qui parlent d'eux-mêmes.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                <Camera className="w-4 h-4 text-blue-400" /> Photos
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                <PlayCircle className="w-4 h-4 text-cyan-400" /> Vidéos
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gallery Item 1 */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-800">
              <AIGeneratedImage 
                prompt="Vue en contre-plongée d'un laveur de vitres utilisant une perche télescopique avec une brosse au sommet pour nettoyer les fenêtres d'un bâtiment moderne. On voit de l'eau pulvérisée sur le verre, aspect 'eau pure' sans mousse, ciel bleu en arrière-plan."
                alt="Lavage de vitres avec pôle d'extension au 2ème étage" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-blue-400 font-medium text-sm mb-1">Résidentiel</span>
                <h4 className="text-xl font-bold">Pôle d'extension (2e étage)</h4>
              </div>
            </div>
            
            {/* Gallery Item 2 */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-800">
              <AIGeneratedImage 
                prompt="Photo réaliste d'un technicien utilisant une machine de nettoyage de tapis à brosses rotatives (encapsulation) sur une moquette de bureau grise. Éclairage professionnel, style net et moderne, haute résolution."
                alt="Lavage de tapis par encapsulation" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-cyan-400 font-medium text-sm mb-1">Technologie</span>
                <h4 className="text-xl font-bold">Lavage par encapsulation</h4>
              </div>
            </div>

            {/* Gallery Item 3 - Video Placeholder */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1628177142898-93e46e623636?q=80&w=1974&auto=format&fit=crop" 
                alt="Démonstration équipement" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <PlayCircle className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-blue-400 font-medium text-sm mb-1">Vidéo</span>
                <h4 className="text-xl font-bold">Notre équipement en action</h4>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
              Voir plus de photos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-5">
              {/* Contact Info */}
              <div className="lg:col-span-2 bg-blue-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-blue-700 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-2">Contactez-nous</h3>
                  <p className="text-blue-100 mb-12">Prêt à faire briller votre propriété ? Demandez votre soumission gratuite dès aujourd'hui.</p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-500/50 p-3 rounded-xl">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200 font-medium mb-1">Téléphone</p>
                        <a href="tel:8195273636" className="text-xl font-semibold hover:text-blue-200 transition-colors">(819) 527-3636</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-500/50 p-3 rounded-xl">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200 font-medium mb-1">Courriel</p>
                        <a href="mailto:claudequirion95@gmail.com" className="text-lg font-medium hover:text-blue-200 transition-colors break-all">claudequirion95@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3 p-10 lg:p-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Demande de soumission</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors outline-none"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">Service souhaité</label>
                    <select 
                      id="service" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors outline-none appearance-none"
                    >
                      <option>Lavage de vitres à l'eau pure</option>
                      <option>Lavage de tapis</option>
                      <option>Les deux services</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Détails de votre demande</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors outline-none resize-none"
                      placeholder="Décrivez brièvement vos besoins (ex: nombre de fenêtres, superficie des tapis...)"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10">
                    Envoyer la demande
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span className="font-bold tracking-tight">LES ARCHITECTES DU NETTOYAGE</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#galerie" className="hover:text-white transition-colors">Galerie</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Les Architectes du Nettoyage. Tous droits réservés.</p>
            <p>Créé avec passion pour la propreté.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
