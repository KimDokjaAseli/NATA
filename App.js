
import React, { useState, useEffect, useRef } from 'react';
import htm from 'htm';
import * as lucideModule from 'lucide-react';

const html = htm.bind(React.createElement);
// Handle both named exports and default export for CDN compatibility
const lucide = lucideModule.default || lucideModule;

// --- Sub-Components ---

const FeatureCard = ({ title, children, icon, color = "pink" }) => {
  const colorClasses = {
    pink: "border-pink-100 bg-white text-pink-500",
    blue: "border-blue-100 bg-white text-blue-500",
    purple: "border-purple-100 bg-white text-purple-500",
    orange: "border-orange-100 bg-white text-orange-500",
    green: "border-green-100 bg-white text-green-500"
  };

  return html`
    <div class="p-6 rounded-[2.5rem] shadow-sm border-2 ${colorClasses[color].split(' ')[0]} hover:shadow-md transition-all duration-300 mb-6 glass animate-in fade-in slide-in-from-bottom-4">
      <div class="flex items-center mb-4">
        <div class="p-2 rounded-xl mr-3 bg-opacity-10 ${colorClasses[color].split(' ')[1]} ${colorClasses[color].split(' ')[2]}">
          ${icon}
        </div>
        <h2 class="text-xl font-bold text-gray-800">${title}</h2>
      </div>
      ${children}
    </div>
  `;
};

const Polaroid = ({ caption, date, rotate = "rotate-1" }) => html`
  <div class="bg-white p-3 shadow-xl border border-gray-100 ${rotate} transform transition-transform hover:rotate-0 hover:scale-105 cursor-pointer">
    <div class="bg-gray-200 aspect-square mb-3 overflow-hidden">
       <img src="https://images.unsplash.com/photo-1516589174184-c68526516282?w=400&auto=format&fit=crop&q=60" alt="placeholder" class="w-full h-full object-cover opacity-80" />
    </div>
    <p class="font-pacifico text-gray-700 text-center text-sm">${caption}</p>
    <p class="text-[10px] text-gray-400 text-center mt-1">${date}</p>
  </div>
`;

// --- Main App ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loveMeter, setLoveMeter] = useState(88);
  const [kangenCount, setKangenCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [randomIdea, setRandomIdea] = useState("Scroll TikTok bareng lewat Share Screen");
  const [currentMood, setCurrentMood] = useState("Kangen tapi Gengsi");
  
  // State baru untuk fitur baru
  const [isHugging, setIsHugging] = useState(false);
  const [capsuleLocked, setCapsuleLocked] = useState(true);
  const [capsuleMessage, setCapsuleMessage] = useState("");
  const [showCapsuleInput, setShowCapsuleInput] = useState(false);

  const dateIdeas = [
    "Nonton Netflix Party tapi kamu ketiduran di tengah film",
    "Main Roblox bareng sampai emosi sendiri",
    "Deep talk jam 2 pagi bahas konspirasi dunia",
    "Mukbang LDR: Makan bakso di tempat masing-masing sambil VC",
    "Bikin playlist Spotify isinya lagu galau semua",
    "Sleep call sampai HP panas kayak setrikaan",
    "Ngadu screenshot chat pertama kali kenal (adu cringe)",
    "Window shopping di Shopee tapi cuma dimasukin keranjang"
  ];

  const handleKangen = () => {
    setKangenCount(prev => prev + 1);
    setLoveMeter(prev => Math.min(prev + 0.5, 100));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleVirtualHug = () => {
    setIsHugging(true);
    // Pola getar: 200ms getar, 100ms diam, 500ms getar (seperti detak jantung)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 500]);
    }
    setTimeout(() => setIsHugging(false), 1000);
  };

  const handleLockCapsule = (e) => {
    e.preventDefault();
    if(capsuleMessage.trim() === "") return;
    setCapsuleLocked(true);
    setShowCapsuleInput(false);
    alert("Surat berhasil dikunci! Baru bisa dibuka bulan depan ya 😜");
  };

  // Views based on Tabs
  const renderHome = () => html`
    <div class="animate-in fade-in duration-500">
      
      <!-- Fitur Lagu Kita (Spotify) -->
      <${FeatureCard} title="Lagu Kita" icon=${html`<${lucide.Music} size=${24} />`} color="green">
        <div class="rounded-2xl overflow-hidden shadow-md border border-green-100 bg-black">
          <iframe 
            style=${{ borderRadius: '12px' }} 
            src="https://open.spotify.com/track/6ZGgaShxOimGDfRz1T1zje" 
            width="100%" 
            height="80" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>
        <p class="text-[10px] text-gray-400 mt-2 text-center italic">Play ini dulu biar berasa deketan 🎵</p>
      <//>

      <${FeatureCard} title="Status Koneksi Hati" icon=${html`<${lucide.Wifi} size=${24} />`} color="pink">
        <div class="space-y-4">
          <div class="flex justify-between items-end mb-1">
            <span class="text-sm font-bold text-pink-600 flex items-center gap-1">
              <${lucide.Zap} size=${14} /> Sinyal Sayang
            </span>
            <span class="text-xs font-mono text-gray-400">${loveMeter.toFixed(1)}% Connected</span>
          </div>
          <div class="w-full bg-pink-50 rounded-full h-5 p-1 border border-pink-100 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-pink-400 to-pink-600 h-full rounded-full transition-all duration-1000 shadow-sm"
              style=${{ width: `${loveMeter}%` }}
            ></div>
          </div>
          <p class="text-[10px] text-gray-400 italic text-center italic">*Update otomatis setiap kali kamu senyum.</p>
        </div>
      <//>

      <div class="flex flex-col items-center gap-4 my-10">
        <button 
          onClick=${handleKangen}
          class="tap-effect group relative bg-white p-1 rounded-full shadow-[0_10px_40px_-10px_rgba(219,39,119,0.5)] border-2 border-pink-200"
        >
          <div class="bg-gradient-to-br from-pink-500 to-rose-400 px-12 py-10 rounded-full flex flex-col items-center transition-all group-hover:brightness-110">
            <${lucide.Heart} class="text-white mb-2 animate-pulse" size=${40} fill="white" />
            <span class="text-white font-bold text-xl uppercase tracking-widest">KANGEN!</span>
          </div>
        </button>
        <div class="text-center">
          <p class="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Total kangen hari ini</p>
          <p class="text-pink-600 font-bold text-3xl">${kangenCount}</p>
        </div>
      </div>
    </div>
  `;

  const renderMemories = () => html`
    <div class="animate-in fade-in slide-in-from-right-4 duration-500">
      
      <!-- Fitur Time Capsule -->
      <div class="bg-yellow-50 p-6 rounded-[2rem] border border-yellow-200 mb-8 relative overflow-hidden">
        <div class="absolute -right-5 -top-5 opacity-10">
            <${lucide.Hourglass} size=${100} class="text-yellow-600" />
        </div>
        
        <h2 class="text-xl font-bold text-yellow-800 mb-2 flex items-center gap-2">
            <${lucide.Lock} size=${20} /> Kapsul Waktu
        </h2>
        
        ${!showCapsuleInput ? html`
            <div class="text-center py-6 bg-white/60 rounded-xl border border-dashed border-yellow-300 backdrop-blur-sm cursor-pointer hover:bg-white transition-colors"
                 onClick=${() => capsuleLocked ? alert("Belum waktunya dibuka sayang! Sabar yaa 😝") : setShowCapsuleInput(true)}>
                <div class="flex justify-center mb-3">
                   ${capsuleLocked ? 
                     html`<${lucide.Lock} size=${40} class="text-yellow-500 animate-bounce" />` : 
                     html`<${lucide.MailOpen} size=${40} class="text-yellow-500" />`
                   }
                </div>
                <h3 class="font-bold text-gray-700">${capsuleLocked ? "Surat Rahasia Terkunci" : "Buat Surat Baru"}</h3>
                <p class="text-xs text-gray-500 mt-1">
                    ${capsuleLocked ? "Akan terbuka otomatis saat Anniv nanti." : "Tulis pesan untuk masa depan."}
                </p>
                ${capsuleLocked && html`
                    <button class="mt-4 text-[10px] font-bold text-yellow-600 uppercase tracking-widest bg-yellow-100 px-3 py-1 rounded-full">
                        Jangan diklik!
                    </button>
                `}
            </div>
            <button onClick=${() => { setCapsuleLocked(false); setShowCapsuleInput(true); }} class="w-full mt-3 text-xs text-yellow-600 underline">
                + Buat Kapsul Baru
            </button>
        ` : html`
            <div class="bg-white p-4 rounded-xl shadow-sm">
                <p class="text-xs text-gray-500 mb-2">Tulis sesuatu buat dibaca nanti:</p>
                <textarea 
                    value=${capsuleMessage}
                    onInput=${(e) => setCapsuleMessage(e.target.value)}
                    class="w-full bg-gray-50 p-3 rounded-lg text-sm mb-3 border focus:border-yellow-400 outline-none resize-none h-24"
                    placeholder="Hai masa depan..."
                ></textarea>
                <div class="flex gap-2">
                    <button onClick=${() => setShowCapsuleInput(false)} class="flex-1 py-2 text-xs text-gray-500">Batal</button>
                    <button onClick=${handleLockCapsule} class="flex-1 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-lg text-xs shadow-sm hover:bg-yellow-500">
                        Kunci Surat 🔒
                    </button>
                </div>
            </div>
        `}
      </div>

      <h2 class="text-2xl font-bold text-gray-800 mb-6 px-2 flex items-center gap-2">
        <${lucide.Camera} class="text-pink-500" /> Museum Rindu
      </h2>
      <div class="grid grid-cols-2 gap-4">
        <${Polaroid} caption="First Date (Virtual)" date="12 Okt 2023" rotate="-rotate-2" />
        <${Polaroid} caption="Ketiduran pas VC" date="05 Nov 2023" rotate="rotate-3" />
        <${Polaroid} caption="Muka Bantal" date="19 Des 2023" rotate="-rotate-1" />
        <${Polaroid} caption="Lagi Ngambek" date="01 Jan 2024" rotate="rotate-2" />
      </div>
      <p class="text-center text-gray-400 text-xs mt-10 italic">"Meskipun cuma lewat layar, memorinya tetep nyata."</p>
    </div>
  `;

  const renderGames = () => html`
    <div class="animate-in fade-in slide-in-from-right-4 duration-500">
       
       <!-- Fitur Virtual Hug -->
       <div class="mb-8 p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-[2.5rem] border border-pink-100 text-center relative overflow-hidden">
          <h3 class="font-bold text-pink-800 mb-1">Virtual Hug Simulator</h3>
          <p class="text-xs text-gray-500 mb-6">Tekan tombol ini kalo lagi butuh peluk</p>
          
          <button 
            onMouseDown=${handleVirtualHug}
            onTouchStart=${handleVirtualHug}
            class="tap-effect relative w-32 h-32 bg-white rounded-full mx-auto shadow-[0_0_40px_rgba(236,72,153,0.3)] flex items-center justify-center group transition-all duration-300 ${isHugging ? 'scale-95' : 'hover:scale-105'}"
          >
             <div class="absolute inset-0 bg-pink-400 rounded-full opacity-0 ${isHugging ? 'animate-ping opacity-20' : ''}"></div>
             <${lucide.HeartHandshake} size=${48} class="${isHugging ? 'text-pink-600 scale-110' : 'text-pink-400'} transition-all duration-300" />
          </button>
          
          <p class="text-[10px] text-pink-400 mt-4 h-4 font-bold tracking-widest uppercase transition-opacity ${isHugging ? 'opacity-100' : 'opacity-0'}">
            *Mengirim Pelukan...*
          </p>
       </div>

       <${FeatureCard} title="Virtual Date Generator" icon=${html`<${lucide.Gamepad2} size=${24} />`} color="blue">
        <div class="bg-blue-50/50 p-6 rounded-[1.5rem] text-center border-dashed border-2 border-blue-200 mb-5 min-h-[120px] flex items-center justify-center">
          <p class="text-blue-900 font-semibold italic text-lg leading-snug">"${randomIdea}"</p>
        </div>
        <button 
          onClick=${() => setRandomIdea(dateIdeas[Math.floor(Math.random() * dateIdeas.length)])}
          class="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 tap-effect shadow-lg shadow-blue-200"
        >
          <${lucide.Shuffle} size=${18} /> Acak Ide Baru
        </button>
      <//>

      <div class="p-6 bg-orange-50 rounded-[2.5rem] border-2 border-orange-100">
        <h3 class="font-bold text-orange-800 mb-4 flex items-center gap-2 text-sm">
          <${lucide.Trophy} size=${16} /> LDR Achievements
        </h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3 bg-white/50 p-2 rounded-xl">
             <div class="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center text-white text-xs font-bold">1</div>
             <span class="text-xs text-orange-900 font-medium">Bisa tahan gak VC seharian</span>
          </div>
          <div class="flex items-center gap-3 bg-white/50 p-2 rounded-xl opacity-50">
             <div class="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center text-white text-xs font-bold">?</div>
             <span class="text-xs text-gray-500 font-medium">Ketemu langsung (In Progress)</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const renderMood = () => html`
    <div class="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 class="text-2xl font-bold text-gray-800 mb-2 px-2">Mood Aku Sekarang</h2>
      <p class="text-xs text-gray-400 mb-6 px-2">Pilih mood kamu biar aku tau harus ngapain.</p>
      
      <div class="grid grid-cols-2 gap-3 mb-8">
        ${['Lagi Reog', 'Kangen Banget', 'Laper Parah', 'Ngantuk Berat', 'Gak Mood', 'Butuh Peluk'].map(m => html`
          <button 
            onClick=${() => setCurrentMood(m)}
            class="p-4 rounded-2xl border-2 text-sm font-bold transition-all tap-effect ${currentMood === m ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-100 bg-white text-gray-500'}"
          >
            ${m}
          </button>
        `)}
      </div>

      <div class="p-6 bg-pink-600 text-white rounded-[2rem] shadow-xl relative overflow-hidden">
        <div class="relative z-10">
          <p class="text-xs opacity-80 mb-1">Status kamu di HP aku:</p>
          <p class="text-xl font-bold uppercase tracking-tight">${currentMood}</p>
        </div>
        <${lucide.Smile} class="absolute -right-4 -bottom-4 opacity-10" size=${120} />
      </div>
    </div>
  `;

  return html`
    <div class="min-h-screen pb-32 max-w-md mx-auto relative px-6 pt-12 lg:bg-white lg:shadow-2xl lg:my-10 lg:rounded-[3rem] lg:min-h-[850px] lg:overflow-hidden">
      
      <!-- Top Decor -->
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-3xl font-pacifico text-pink-600 animate-float">NATAAAAAA</h1>
          <p class="text-[10px] text-gray-400 font-bold tracking-widest uppercase">APLIKASII ORAnG BUCIN</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500">
          <${lucide.Bell} size=${20} />
        </div>
      </div>

      <!-- Main Content Area -->
      <main class="min-h-[500px]">
        ${activeTab === 'home' && renderHome()}
        ${activeTab === 'gallery' && renderMemories()}
        ${activeTab === 'games' && renderGames()}
        ${activeTab === 'mood' && renderMood()}
      </main>

      <!-- Toast Notification -->
      ${showToast && html`
        <div class="fixed top-12 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-full shadow-2xl border-2 border-pink-500 z-50 animate-bounce flex items-center gap-3 glass">
          <${lucide.MessageCircleHeart} class="text-pink-500" />
          <span class="font-bold text-pink-600 whitespace-nowrap uppercase text-sm">Aku juga kangen! ❤️</span>
        </div>
      `}

      <!-- Custom Bottom Navigation Bar -->
      <nav class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] bg-white/80 backdrop-blur-2xl border border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] rounded-full px-4 py-3 flex justify-around items-center z-40 lg:absolute lg:bottom-10 lg:w-[85%]">
        <button 
          onClick=${() => setActiveTab('home')}
          class="flex flex-col items-center gap-1 transition-all tap-effect ${activeTab === 'home' ? 'text-pink-600' : 'text-gray-300'}"
        >
          <${lucide.Heart} size=${24} fill=${activeTab === 'home' ? "currentColor" : "none"} />
          <span class="text-[8px] font-bold uppercase tracking-tighter">Home</span>
        </button>
        
        <button 
          onClick=${() => setActiveTab('gallery')}
          class="flex flex-col items-center gap-1 transition-all tap-effect ${activeTab === 'gallery' ? 'text-pink-600' : 'text-gray-300'}"
        >
          <${lucide.Camera} size=${24} fill=${activeTab === 'gallery' ? "currentColor" : "none"} />
          <span class="text-[8px] font-bold uppercase tracking-tighter">Gallery</span>
        </button>

        <button 
          onClick=${() => setActiveTab('games')}
          class="flex flex-col items-center gap-1 transition-all tap-effect ${activeTab === 'games' ? 'text-pink-600' : 'text-gray-300'}"
        >
          <${lucide.Gamepad2} size=${24} fill=${activeTab === 'games' ? "currentColor" : "none"} />
          <span class="text-[8px] font-bold uppercase tracking-tighter">Play</span>
        </button>

        <button 
          onClick=${() => setActiveTab('mood')}
          class="flex flex-col items-center gap-1 transition-all tap-effect ${activeTab === 'mood' ? 'text-pink-600' : 'text-gray-300'}"
        >
          <${lucide.Smile} size=${24} fill=${activeTab === 'mood' ? "currentColor" : "none"} />
          <span class="text-[8px] font-bold uppercase tracking-tighter">Mood</span>
        </button>
      </nav>

    </div>
  `;
};

export default App;
