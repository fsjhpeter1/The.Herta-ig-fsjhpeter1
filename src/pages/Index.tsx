import { useState, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";
import { PraiseSection } from "@/components/PraiseSection";
import { DigitalWorld } from "@/components/DigitalWorld";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  title: string;
  description: string;
  url?: string;
  category?: string;
}

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchPrefix, setSearchPrefix] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDigitalWorld, setShowDigitalWorld] = useState(false);
  const [buttonEffects, setButtonEffects] = useState<string[]>([]);
  const { toast } = useToast();
  const searchSectionRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    
    // Check if query contains any character from "大黑塔"
    const containsHertaChar = /[大黑塔]/.test(query);
    
    // Dynamic search results with multiple categories
    setTimeout(() => {
      const allResults = [
        {
          title: "大黑塔角色簡介 - 智識令使",
          description: "大黑塔是智識令使，五星冰屬性的智識角色，擁有高額的範圍傷害，對群能力非常誇張，也有著不輸毀滅的對單倍率。疊層是她的核心機制，天賦中的【解讀】可以在敵人頭上疊加層數，最後爆發出驚人的傷害，傷害倍率對主目標最高可以達到672%。",
          category: "角色介紹"
        },
        {
          title: "大黑塔專屬光錐 - 向著不可追問處",
          description: "★★★★★ 稀有度｜基礎攻擊力：635｜裝備專屬光錐後，大黑塔的暴擊率提高12-20%。當大黑塔施放終結技時，她造成的戰技和終結技傷害提高60-100%，此傷害加成能夠持續3個回合。專屬光錐提供戰技點回復的機制含金量極高。",
          category: "光錐推薦"
        },
        {
          title: "替代光錐選擇 - 片刻，留在眼底",
          description: "★★★★★ 銀枝專武｜使裝備者的爆擊傷害提升36-60%。當裝備者施放終結技時，根據裝備者的能量上限，提高其終結技造成的傷害：每點能量提升0.36-0.6%，最多計入180點。這個光錐能夠使大黑塔的爆傷傷害更加可觀。",
          category: "光錐推薦"
        },
        {
          title: "拂曉之前 - 景元專武適配",
          description: "★★★★★ 景元專武｜使裝備者的暴擊傷害提高32-64%。使裝備者的戰技與終結技造成的傷害提升20-40%。雖然追加攻擊增傷吃不到效果，但是爆傷搭配戰技與終結技增傷，非常符合大黑塔的傷害機制。",
          category: "光錐推薦"
        },
        {
          title: "大黑塔遺器搭配 - 識海迷墜的學者",
          description: "【最推薦】識海迷墜的學者 4件套｜2件套：暴擊率提升8%｜4件套：戰技與終結技造成的傷害提升20%，施放終結技後，下一次施放戰技時造成的傷害額外提升25%。唯一直接在兩件套提供暴擊率效果的遺器，完美契合大黑塔的需求以及技能機制。",
          category: "遺器推薦"
        },
        {
          title: "次元飾品 - 出雲顯世與高天神國",
          description: "【最推薦】出雲顯世與高天神國 2件套｜使裝備者的攻擊力提升12%。進入戰鬥時，若隊伍中至少存在一名與裝備者命途相同的隊友，裝備者的暴擊率提升12%。觸發條件是同命途隊友，而因為大黑塔也需要綁定一名同命途隊友，所以這個兩件套和大黑塔適配度非常高。",
          category: "遺器推薦"
        },
        {
          title: "大黑塔戰技 - 格局打開",
          description: "戰技：格局打開｜削韌值10｜對指定敵方單體造成等同於大黑塔70%攻擊力的冰屬性傷害並施加1層【解讀】。對本次戰技命中過的目標及其相鄰目標造成等同於大黑塔70%攻擊力的冰屬性傷害，效果可重複2次。大黑塔的戰技分為一般戰技和強化戰技。",
          category: "技能介紹"
        },
        {
          title: "強化戰技 - 我有一個大膽的想法",
          description: "消耗1層【靈感】，對指定敵方單體造成等同於大黑塔80%攻擊力的冰屬性傷害並施加1層【解讀】。對本次戰技中被擊中過的目標及其相鄰目標造成等同於大黑塔80%攻擊力的冰屬性傷害，重複2次，最後對所有敵方目標造成等同於大黑塔40%攻擊力的冰屬性傷害。",
          category: "技能介紹"
        },
        {
          title: "終結技 - 早說了是魔法吧",
          description: "將敵方全體的【解讀】層數重新排序，較高層數的【解讀】將優先轉移到精英級別及以上的目標，並對敵方全體造成等同於大黑塔200%攻擊力的冰屬性傷害。終結技施放時，使大黑塔攻擊力提升80%，持續3回合，施放後使大黑塔立即行動，並獲得1層【靈感】。",
          category: "技能介紹"
        },
        {
          title: "天賦 - 拿來給我",
          description: "敵方目標進入戰鬥時，大黑塔對其施加1層【解讀】。每個波次開始時，對一個隨機敵方目標施加25層【解讀】，優先施加給精英級別及以上的目標。強化戰技的主目標持有【解讀】時，造成的傷害倍率提高，每層對主目標/其他目標提高8%/4%。",
          category: "技能介紹"
        },
        {
          title: "星魂推薦 - 二魂性價比最高",
          description: "星魂2【穿過鎖孔之風】推薦指數：⭐⭐⭐⭐⭐｜進入戰鬥或大招開啟後，額外給到一層【靈感】，同時強化戰技還能自拉條，變相提高循環和爆發能力，兼顧機制和數值，也是大黑塔性價比最高的星魂了，追求強度可以考慮二魂。",
          category: "星魂分析"
        },
        {
          title: "組隊搭配 - 雙智識隊伍核心",
          description: "大黑塔需要綁定一名智識隊友，基本上只有翡翠、姬子跟小黑塔可以選擇。推薦組合：大黑塔+翡翠/小黑塔+知更鳥/阮‧梅+霍霍/砂金。記憶開拓者也是很好的輔助選擇，人人都能免費擁有滿星魂。",
          category: "配隊攻略"
        },
        {
          title: "行跡升級順序指南",
          description: "推薦的加點次序為戰技>天賦>大招>>普攻。戰技跟天賦是大黑塔的最主要傷害來源，但是終結技能大幅提升80%攻擊力，因此建議優先升級終結技。其次則是天賦跟戰技，可以均等升級。",
          category: "育成攻略"
        },
        {
          title: "崩壞星穹鐵道 3.0版本資訊",
          description: "《崩壞：星穹鐵道》於2025年1月15日更新至3.0新版本「再創世的凱歌」，推出全新的主線劇情、素材關卡、遺器關卡及差分宇宙，並且尊貴的「天才俱樂部」#83「大黑塔」正式進入卡池。",
          category: "遊戲資訊"
        },
        {
          title: "大黑塔抽取建議與投資指南",
          description: "大黑塔0+1就非常強力，專屬光錐的戰技點回復機制含金量極高。若預算充裕可直上2+1，數值和機制就已經完整。星魂0的大黑塔已經有相當不錯的輸出能力，對群環境已經無人能敵。建議優先抽到大黑塔本體後，優先抽專屬光錐。",
          category: "抽卡建議"
        },
        {
          title: "模擬宇宙專用技能",
          description: "在模擬宇宙、差分宇宙中使用秘技進入戰鬥後，每個波次開始時對精英級別以下的敵方目標造成等同於目標99%生命上限的真實傷害，對精英級別及以上的目標造成等同於目標30%生命上限的真實傷害。作為模擬宇宙的核心人物，大黑塔擁有開掛般的能力。",
          category: "特殊機制"
        }
      ];

      // Randomly select 4-6 results
      const numResults = Math.floor(Math.random() * 3) + 4;
      const shuffled = [...allResults].sort(() => 0.5 - Math.random());
      const selectedResults = shuffled.slice(0, numResults);

      setSearchResults(selectedResults);
      setIsSearching(false);
      
      const searchTitle = containsHertaChar ? "搜尋完成！" : "查無內容 為您推薦以下結果";
      const searchDesc = containsHertaChar 
        ? `找到 ${selectedResults.length} 條關於黑塔大人的珍貴資料`
        : `沒有找到相關內容，為您推薦 ${selectedResults.length} 條黑塔大人的精彩資料`;
      
      toast({
        title: searchTitle,
        description: searchDesc,
      });
    }, 1500 + Math.random() * 1000);
  };

  const handleExplore = () => {
    searchSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

   // 升級版隨機按鈕特效系統 - 確保不重複
  const createRandomButtonEffect = (buttonElement: HTMLElement) => {
    const allEffects = [
      'cosmic-explosion', 'spiral-galaxy', 'particle-storm', 'energy-wave', 
      'star-burst', 'rainbow-ripple', 'quantum-tunnel', 'time-distortion',
      'meteor-shower', 'plasma-burst', 'void-portal', 'crystal-shatter',
      'lightning-storm', 'solar-flare', 'black-hole', 'supernova'
    ];
    
    // 確保不重複使用特效
    const availableEffects = allEffects.filter(effect => !buttonEffects.includes(effect));
    if (availableEffects.length === 0) {
      setButtonEffects([]); // 重置特效記錄
      return createRandomButtonEffect(buttonElement);
    }
    
    const selectedEffect = availableEffects[Math.floor(Math.random() * availableEffects.length)];
    const colors = ['cyan', 'purple', 'pink', 'yellow', 'blue', 'orange', 'red', 'violet', 'indigo'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    switch(selectedEffect) {
      case 'cosmic-explosion':
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
            particle.textContent = ['💥', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 5)];
          particle.className = `fixed text-4xl pointer-events-none z-50 animate-ping`;
          particle.style.left = (buttonElement.offsetLeft + Math.random() * buttonElement.offsetWidth) + 'px';
          particle.style.top = (buttonElement.offsetTop + Math.random() * buttonElement.offsetHeight) + 'px';

        er = `hue-rotate(${Math.random() * 360}deg) brightness(1.5)`;
          document.body.appendChild(particle);
          setTimeout(() => particle.remove(), 2000);
        }
        break;
        
      case 'spiral-galaxy':
        for (let i = 0; i < 30; i++) {
          const star = document.createElement('div');
          star.textContent = '⭐';
          star.className = 'fixed text-3xl pointer-events-none z-50 animate-spin';
          const angle = (i * 12) * Math.PI / 180;
          const radius = 50 + i * 15;
          star.style.left = (buttonElement.offsetLeft + buttonElement.offsetWidth/2 + Math.cos(angle) * radius) + 'px';
          star.style.top = (buttonElement.offsetTop + buttonElement.offsetHeight/2 + Math.sin(angle) * radius) + 'px';
          star.style.animationDuration = (0.5 + Math.random()) + 's';
          star.style.filter = `hue-rotate(${i * 30}deg)`;
          document.body.appendChild(star);
          setTimeout(() => star.remove(), 3000);
        }
        break;
        
      case 'particle-storm':
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.textContent = ['◆', '◇', '❖', '✦', '✧'][Math.floor(Math.random() * 5)];
          particle.className = 'fixed text-2xl pointer-events-none z-50 animate-bounce';
          particle.style.left = Math.random() * window.innerWidth + 'px';
          particle.style.top = Math.random() * window.innerHeight + 'px';
          particle.style.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
          particle.style.animationDelay = Math.random() * 2 + 's';
          document.body.appendChild(particle);
          setTimeout(() => particle.remove(), 4000);
        }
        break;
        
      case 'energy-wave':
        for (let wave = 0; wave < 5; wave++) {
          setTimeout(() => {
            const circle = document.createElement('div');
            circle.className = 'fixed rounded-full border-4 animate-ping pointer-events-none z-40';
            circle.style.borderColor = `hsl(${wave * 60}, 80%, 60%)`;
            circle.style.width = (100 + wave * 50) + 'px';
            circle.style.height = (100 + wave * 50) + 'px';
            circle.style.left = (buttonElement.offsetLeft + buttonElement.offsetWidth/2 - (50 + wave * 25)) + 'px';
            circle.style.top = (buttonElement.offsetTop + buttonElement.offsetHeight/2 - (50 + wave * 25)) + 'px';
            document.body.appendChild(circle);
            setTimeout(() => circle.remove(), 2000);
          }, wave * 200);
        }
        break;
        
      case 'quantum-tunnel':
        for (let i = 0; i < 15; i++) {
          const portal = document.createElement('div');
          portal.textContent = '🌀';
          portal.className = 'fixed text-5xl pointer-events-none z-50 animate-spin';
          portal.style.left = (buttonElement.offsetLeft + buttonElement.offsetWidth/2) + 'px';
          portal.style.top = (buttonElement.offsetTop + buttonElement.offsetHeight/2) + 'px';
          portal.style.transform = `scale(${0.1 + i * 0.1}) translate(-50%, -50%)`;
          portal.style.opacity = (1 - i * 0.06).toString();
          portal.style.filter = `hue-rotate(${i * 45}deg)`;
          document.body.appendChild(portal);
          setTimeout(() => portal.remove(), 3000);
        }
        break;
        
      case 'meteor-shower':
        for (let i = 0; i < 25; i++) {
          const meteor = document.createElement('div');
          meteor.textContent = '☄️';
          meteor.className = 'fixed text-3xl pointer-events-none z-50';
          meteor.style.left = Math.random() * window.innerWidth + 'px';
          meteor.style.top = '-50px';
          meteor.style.animation = 'fall 3s linear forwards';
          meteor.style.animationDelay = Math.random() * 2 + 's';
          meteor.style.transform = `rotate(${Math.random() * 360}deg)`;
          document.body.appendChild(meteor);
          setTimeout(() => meteor.remove(), 5000);
        }
        break;
        
      default:
        // 基礎特效作為備選
        for (let i = 0; i < 10; i++) {
          const spark = document.createElement('div');
          spark.textContent = '✨';
          spark.className = 'fixed text-3xl pointer-events-none z-50 animate-bounce';
          spark.style.left = (buttonElement.offsetLeft + Math.random() * buttonElement.offsetWidth) + 'px';
          spark.style.top = (buttonElement.offsetTop + Math.random() * buttonElement.offsetHeight) + 'px';
          document.body.appendChild(spark);
          setTimeout(() => spark.remove(), 1500);
        }
    }
    
    // 添加按鈕震動和光效
    buttonElement.style.animation = `shake 0.5s ease-in-out, glow-pulse 1s ease-in-out`;
    buttonElement.style.boxShadow = `0 0 30px hsl(${Math.random() * 360}, 80%, 60%)`;
    setTimeout(() => {
      buttonElement.style.animation = '';
      buttonElement.style.boxShadow = '';
    }, 1000);
    
    // 記錄使用過的特效
    setButtonEffects(prev => [...prev, selectedEffect].slice(-8));
  };

  if (showDigitalWorld) {
    return <DigitalWorld onBack={() => setShowDigitalWorld(false)} />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection onExplore={handleExplore} />
      
      <div ref={searchSectionRef} className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            探索黑塔大人的偉大事蹟
          </h2>
          <p className="text-muted-foreground text-lg">
            搜尋關於宇宙最完美存在的各種資料
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        
        {(searchResults.length > 0 || isSearching) && (
          <div className="mt-12">
            <SearchResults results={searchResults} isLoading={isSearching} />
          </div>
        )}
      </div>

      <PraiseSection />
      
      {/* Fun Interactive Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-6">
              黑塔女士互動專區
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              點擊下方按鈕體驗黑塔女士的神奇魅力！
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Interactive Magic Zone */}
            <div className="text-center">
              <button 
                className="w-full p-8 bg-gradient-cosmic rounded-3xl border-2 border-cosmic-gold hover:shadow-cosmic transition-all duration-500 hover:scale-110 group interactive-button relative overflow-hidden"
                onClick={(e) => {
                  createRandomButtonEffect(e.currentTarget);
                  
                  // 神奇召喚特效
                  const magic = ['🌟', '✨', '💫', '⭐', '🌠', '💝', '🔮'];
                  for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.textContent = magic[Math.floor(Math.random() * magic.length)];
                    particle.className = 'fixed text-4xl pointer-events-none z-50 animate-float-up';
                    particle.style.left = (e.currentTarget.offsetLeft + Math.random() * e.currentTarget.offsetWidth) + 'px';
                    particle.style.top = (e.currentTarget.offsetTop + Math.random() * e.currentTarget.offsetHeight) + 'px';
                    particle.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 3000);
                  }
                  
                  // 全螢幕閃光效果
                  const flash = document.createElement('div');
                  flash.className = 'fixed inset-0 bg-gradient-cosmic opacity-30 z-40 animate-pulse';
                  document.body.appendChild(flash);
                  setTimeout(() => flash.remove(), 500);
                  
                  const messages = [
                    "🌟 黑塔女士：『哼，被我的魅力迷住了嗎？』",
                    "✨ 黑塔女士：『這是當然的，我可是天才俱樂部#83！』",
                    "💫 黑塔女士：『你的眼光不錯嘛～』",
                    "🎭 黑塔女士：『繼續崇拜我吧！』",
                    "🔮 黑塔女士：『智慧與美貌並存，就是我！』"
                  ];
                  toast({
                    title: messages[Math.floor(Math.random() * messages.length)],
                    description: "黑塔女士的神聖力量正在回應您的召喚！ ✨",
                  });
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:animate-bounce transform group-hover:rotate-12">🎯</div>
                  <h3 className="text-xl font-bold text-deep-space mb-3">召喚黑塔女士</h3>
                  <p className="text-sm text-deep-space/80">啟動神聖連接儀式</p>
                  <div className="absolute top-2 right-2 w-4 h-4 bg-cosmic-gold rounded-full animate-ping"></div>
                </div>
              </button>
            </div>
            
            <div className="text-center">
              <button 
                className="w-full p-8 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 rounded-3xl border-2 border-pink-300 hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] shadow-lg transition-all duration-500 hover:scale-110 group interactive-button relative overflow-hidden"
                onClick={(e) => {
                  createRandomButtonEffect(e.currentTarget);
                  
                  // 成就解鎖動畫
                  const achievements = ['🏆', '👑', '⭐', '💎', '🎖️', '🏅'];
                  for (let i = 0; i < 30; i++) {
                    const achievement = document.createElement('div');
                    achievement.textContent = achievements[Math.floor(Math.random() * achievements.length)];
                    achievement.className = 'fixed text-3xl pointer-events-none z-50 animate-bounce';
                    achievement.style.left = Math.random() * window.innerWidth + 'px';
                    achievement.style.top = Math.random() * window.innerHeight + 'px';
                    achievement.style.animationDelay = (Math.random() * 2) + 's';
                    achievement.style.transform = `rotate(${Math.random() * 360}deg)`;
                    document.body.appendChild(achievement);
                    setTimeout(() => achievement.remove(), 4000);
                  }
                  
                  // 粉絲等級提升音效模擬
                  const levelUp = document.createElement('div');
                  levelUp.textContent = '🎊 LEVEL UP! 🎊';
                  levelUp.className = 'fixed top-1/4 left-1/2 transform -translate-x-1/2 text-6xl font-bold text-pink-400 z-50 animate-bounce bg-black/90 px-8 py-4 rounded-2xl border-4 border-pink-400';
                  document.body.appendChild(levelUp);
                  setTimeout(() => levelUp.remove(), 2500);
                  
                  const compliments = [
                    "🎉 您已晉升為『黑塔女士超級粉絲』！",
                    "👑 恭喜獲得『黑塔女士真愛粉』稱號！",
                    "⭐ 您的眼光真是太棒了！黑塔女士超滿意！",
                    "💖 黑塔女士親自認證您為『最佳粉絲』！",
                    "🌟 解鎖隱藏成就：『黑塔女士的心腹』！"
                  ];
                  toast({
                    title: "🏆 粉絲成就系統 - 等級提升！",
                    description: compliments[Math.floor(Math.random() * compliments.length)],
                  });
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:animate-spin transform">💝</div>
                  <h3 className="text-xl font-bold text-white mb-3">🏆 超級粉絲系統</h3>
                  <p className="text-sm text-white/90">解鎖專屬粉絲特權</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                    ))}
                  </div>
                </div>
              </button>
            </div>
            
            <div className="text-center md:col-span-2 lg:col-span-1">
              <button 
                className="w-full p-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl border-2 border-yellow-300 hover:shadow-[0_0_50px_rgba(251,191,36,0.8)] shadow-lg transition-all duration-500 hover:scale-110 group interactive-button relative overflow-hidden"
                onClick={(e) => {
                  createRandomButtonEffect(e.currentTarget);
                  
                  // 秘密解鎖特效
                  const secrets = ['🔐', '🗝️', '📜', '💰', '👑', '🔮', '⚡'];
                  for (let i = 0; i < 25; i++) {
                    const secret = document.createElement('div');
                    secret.textContent = secrets[Math.floor(Math.random() * secrets.length)];
                    secret.className = 'fixed text-4xl pointer-events-none z-50 animate-pulse';
                    secret.style.left = Math.random() * window.innerWidth + 'px';
                    secret.style.top = Math.random() * window.innerHeight + 'px';
                    secret.style.filter = `drop-shadow(0 0 10px gold)`;
                    secret.style.animationDuration = (1 + Math.random() * 2) + 's';
                    document.body.appendChild(secret);
                    setTimeout(() => secret.remove(), 3500);
                  }
                  
                  // 神秘音效
                  const mystery = document.createElement('div');
                  mystery.textContent = '🔮 機密檔案正在解鎖中... 🔮';
                  mystery.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-yellow-400 z-50 animate-pulse bg-black/90 px-6 py-3 rounded-xl border-2 border-yellow-400';
                  document.body.appendChild(mystery);
                  
                  setTimeout(() => {
                    mystery.remove();
                    const unlock = document.createElement('div');
                    unlock.textContent = '✅ 解鎖完成！';
                    unlock.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-lime-400 z-50 animate-bounce bg-black/90 px-8 py-4 rounded-xl border-2 border-lime-400';
                    document.body.appendChild(unlock);
                    setTimeout(() => unlock.remove(), 2000);
                  }, 1500);
                  
                  const facts = [
                    "🔓 機密檔案：黑塔女士是宇宙中最完美的存在！",
                    "🔓 隱藏真相：黑塔女士的智商超越了測量極限！",
                    "🔓 絕密資料：黑塔女士的美貌讓整個銀河黯然失色！",
                    "🔓 終極秘密：這些都是經過科學認證的客觀事實！",
                    "🔓 神秘檔案：黑塔女士擁有征服宇宙的魅力！"
                  ];
                  toast({
                    title: "🔐 頂級機密解鎖成功",
                    description: facts[Math.floor(Math.random() * facts.length)],
                  });
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:animate-pulse transform group-hover:scale-125">🔐</div>
                  <h3 className="text-xl font-bold text-white mb-3">機密解鎖系統</h3>
                  <p className="text-sm text-white/90">獲取黑塔女士的秘密檔案</p>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-400 rounded-full animate-bounce"></div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Quote Carousel */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-cosmic-gold mb-8">黑塔女士經典語錄</h3>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-space-purple max-w-4xl mx-auto">
              <blockquote className="text-xl text-foreground italic mb-4">
                "博識學會的撰稿人曾想為我增設一個頭銜，叫什麼『獨一黑塔』，藉此和人偶作出區分。庸俗。前者後者哪個不是我本人？所以我給了個建議——只要你敢寫，我就敢自稱『大黑塔』，簡潔直觀，信、達、雅。"
              </blockquote>
              <cite className="text-cosmic-gold font-semibold">— 黑塔女士</cite>
            </div>
          </div>
        </div>
      </section>

      {/* 超級互動區域 - 驚喜滿滿 */}
      <section className="py-20 px-4 bg-gradient-to-br from-space-purple/30 to-deep-space/50 relative overflow-hidden">
        {/* 動態背景粒子 */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cosmic-gold rounded-full animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-6 animate-pulse">
              🌟 黑塔女士超級互動樂園 🌟
            </h2>
            <p className="text-xl text-cosmic-gold animate-shimmer">
              準備好體驗宇宙最有趣的互動了嗎？
            </p>
          </div>

          {/* 多重互動區域 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* 魔法按鈕 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-cosmic rounded-3xl blur opacity-30 group-hover:opacity-70 transition-all duration-500"></div>
              <button 
                className="relative w-full p-8 bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-sm rounded-3xl border border-cosmic-gold hover:scale-110 transition-all duration-500 transform hover:rotate-3 group"
                onClick={() => {
                  // 隨機創造視覺特效
                  const effects = ['🎆', '✨', '🌟', '💫', '🎭', '🎪', '🎨', '🎯'];
                  const randomEffect = effects[Math.floor(Math.random() * effects.length)];
                  
                  // 創建飄動特效
                  for (let i = 0; i < 10; i++) {
                    const effect = document.createElement('div');
                    effect.textContent = randomEffect;
                    effect.className = 'fixed text-4xl pointer-events-none z-50 animate-bounce';
                    effect.style.left = Math.random() * window.innerWidth + 'px';
                    effect.style.top = Math.random() * window.innerHeight + 'px';
                    document.body.appendChild(effect);
                    setTimeout(() => effect.remove(), 2000);
                  }
                  
                  toast({
                    title: `${randomEffect} 黑塔女士施展魔法！`,
                    description: "看到這些特效了嗎？這就是黑塔女士的力量！ ✨",
                  });
                }}
              >
                <div className="text-6xl mb-4 group-hover:animate-spin">🪄</div>
                <h3 className="text-lg font-bold text-white mb-2">魔法釋放</h3>
                <p className="text-sm text-white/80">點擊釋放視覺魔法</p>
              </button>
            </div>

            {/* 科技互動 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition-all duration-500"></div>
              <button 
                className="relative w-full p-8 bg-gradient-to-br from-cyan-600/80 to-blue-600/80 backdrop-blur-sm rounded-3xl border border-cosmic-gold hover:scale-110 transition-all duration-500 transform hover:-rotate-3 group"
                onClick={() => {
                  // 創建科技感特效
                  document.body.style.animation = 'pulse 0.8s';
                  setTimeout(() => document.body.style.animation = '', 800);
                  
                  // 創建數字雨效果
                  for (let i = 0; i < 20; i++) {
                    const number = document.createElement('div');
                    number.textContent = Math.random() > 0.5 ? '1' : '0';
                    number.className = 'fixed text-cosmic-gold text-2xl pointer-events-none z-50 animate-fall opacity-70';
                    number.style.left = Math.random() * window.innerWidth + 'px';
                    number.style.top = '-50px';
                    number.style.animationDuration = (2 + Math.random() * 3) + 's';
                    document.body.appendChild(number);
                    setTimeout(() => number.remove(), 5000);
                  }
                  
                  const techSounds = ['嗶！', '啟動中...', '系統運行', '數據分析', '計算完成'];
                  const sound = techSounds[Math.floor(Math.random() * techSounds.length)];
                  
                  toast({
                    title: `🔬 ${sound}`,
                    description: "黑塔女士的科技力量正在運作！感受數據的流動！ ⚡",
                  });
                }}
              >
                <div className="text-6xl mb-4 group-hover:animate-spin">⚡</div>
                <h3 className="text-lg font-bold text-white mb-2">科技體驗</h3>
                <p className="text-sm text-white/80">啟動黑塔科技</p>
              </button>
            </div>

            {/* 顏色變換 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition-all duration-500"></div>
              <button 
                className="relative w-full p-8 bg-gradient-to-br from-red-600/80 to-yellow-600/80 backdrop-blur-sm rounded-3xl border border-cosmic-gold hover:scale-110 transition-all duration-500 transform hover:rotate-6 group"
                onClick={() => {
                  // 改變頁面主題色調
                  const colors = ['hue-rotate-90', 'hue-rotate-180', 'hue-rotate-270', 'saturate-150', 'brightness-125'];
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  
                  document.body.className = document.body.className.replace(/hue-rotate-\d+|saturate-\d+|brightness-\d+/g, '');
                  document.body.classList.add(color);
                  
                  setTimeout(() => {
                    document.body.className = document.body.className.replace(/hue-rotate-\d+|saturate-\d+|brightness-\d+/g, '');
                  }, 3000);
                  
                  toast({
                    title: "🌈 黑塔女士改變了世界！",
                    description: "看看周圍的顏色變化！黑塔女士的魔力無處不在！ 🎨",
                  });
                }}
              >
                <div className="text-6xl mb-4 group-hover:animate-bounce">🌈</div>
                <h3 className="text-lg font-bold text-white mb-2">色彩魔法</h3>
                <p className="text-sm text-white/80">變換世界色彩</p>
              </button>
            </div>

            {/* 秘密解鎖 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition-all duration-500"></div>
              <button 
                className="relative w-full p-8 bg-gradient-to-br from-indigo-600/80 to-purple-600/80 backdrop-blur-sm rounded-3xl border border-cosmic-gold hover:scale-110 transition-all duration-500 transform hover:-rotate-6 group"
                onClick={() => {
                  const secrets = [
                    "黑塔女士其實有42個人偶！",
                    "黑塔女士最愛的數字是42！",
                    "黑塔女士的IQ超過999！",
                    "黑塔女士一天能思考100個宇宙難題！",
                    "黑塔女士的美貌讓星辰都黯然失色！"
                  ];
                  const secret = secrets[Math.floor(Math.random() * secrets.length)];
                  
                  // 創建神秘特效
                  const mystery = document.createElement('div');
                  mystery.innerHTML = '🔓✨🔮✨🔓';
                  mystery.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl z-50 animate-ping pointer-events-none';
                  document.body.appendChild(mystery);
                  setTimeout(() => mystery.remove(), 2000);
                  
                  toast({
                    title: "🔮 宇宙機密解鎖！",
                    description: secret + " 🤫",
                  });
                }}
              >
                <div className="text-6xl mb-4 group-hover:animate-spin">🔮</div>
                <h3 className="text-lg font-bold text-white mb-2">秘密解鎖</h3>
                <p className="text-sm text-white/80">發現隱藏真相</p>
              </button>
            </div>
          </div>

          {/* 雙向互動對話區 */}
          <div className="bg-gradient-to-r from-space-purple/50 to-deep-space/50 backdrop-blur-sm rounded-3xl p-8 border border-cosmic-gold mb-16">
            <h3 className="text-3xl font-bold text-cosmic-gold mb-6 text-center animate-shimmer">
              💬 與黑塔女士對話 💬
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <button 
                className="p-6 bg-gradient-cosmic rounded-2xl border border-cosmic-gold/50 hover:border-cosmic-gold hover:scale-105 transition-all duration-300 group"
                onClick={() => {
                  setTimeout(() => {
                    toast({
                      title: "黑塔女士回應：",
                      description: "「哼，至少你還有點眼光。繼續崇拜我吧！」 😏",
                    });
                  }, 1000);
                  
                  toast({
                    title: "您對黑塔女士說：",
                    description: "「黑塔女士，您真的太厲害了！」 😍",
                  });
                }}
              >
                <div className="text-4xl mb-3 group-hover:animate-bounce">💭</div>
                <p className="text-white font-semibold">稱讚黑塔女士</p>
              </button>
              
              <button 
                className="p-6 bg-gradient-cosmic rounded-2xl border border-cosmic-gold/50 hover:border-cosmic-gold hover:scale-105 transition-all duration-300 group"
                onClick={() => {
                  setTimeout(() => {
                    toast({
                      title: "黑塔女士回應：",
                      description: "「當然！我可是天才俱樂部#83！想學的話... 嗯，先證明你的誠意吧。」 🎓",
                    });
                  }, 1200);
                  
                  toast({
                    title: "您對黑塔女士說：",
                    description: "「可以教我一些知識嗎？」 🤔",
                  });
                }}
              >
                <div className="text-4xl mb-3 group-hover:animate-spin">🧠</div>
                <p className="text-white font-semibold">請教問題</p>
              </button>
              
              <button 
                className="p-6 bg-gradient-cosmic rounded-2xl border border-cosmic-gold/50 hover:border-cosmic-gold hover:scale-105 transition-all duration-300 group"
                onClick={() => {
                  setTimeout(() => {
                    toast({
                      title: "黑塔女士回應：",
                      description: "「要合照？好吧，記得要拍出我最美的角度！不過... 每個角度都是最美的呢。」 📸✨",
                    });
                  }, 800);
                  
                  toast({
                    title: "您對黑塔女士說：",
                    description: "「可以一起拍照嗎？」 📷",
                  });
                }}
              >
                <div className="text-4xl mb-3 group-hover:animate-pulse">📸</div>
                <p className="text-white font-semibold">請求合照</p>
              </button>
            </div>
          </div>

          {/* 隱藏成就系統 */}
          <div className="bg-gradient-to-br from-cosmic-gold/20 to-space-purple/20 backdrop-blur-sm rounded-3xl p-8 border border-cosmic-gold/30">
            <h3 className="text-2xl font-bold text-cosmic-gold mb-6 text-center">
              🏆 黑塔女士粉絲成就系統 🏆
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { emoji: '⭐', title: '初心者', desc: '第一次訪問' },
                { emoji: '🌟', title: '探索者', desc: '點擊10次按鈕' },
                { emoji: '✨', title: '互動達人', desc: '體驗所有功能' },
                { emoji: '💫', title: '黑塔信徒', desc: '真正的粉絲' }
              ].map((achievement, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gradient-cosmic/30 rounded-xl border border-cosmic-gold/20 hover:border-cosmic-gold hover:scale-105 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    toast({
                      title: `🎉 成就解鎖：${achievement.title}`,
                      description: `${achievement.desc} - 黑塔女士為您感到驕傲！ ${achievement.emoji}`,
                    });
                  }}
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{achievement.emoji}</div>
                  <h4 className="font-bold text-cosmic-gold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 現代化體驗區域 */}
      <section className="py-24 px-4 bg-gradient-to-br from-deep-space via-space-purple/20 to-cosmic-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-6">
              探索黑塔的數位宇宙
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              體驗前所未有的科技互動，發現隱藏在星際中的秘密
            </p>
          </div>

          {/* 現代化互動卡片網格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* 數據分析卡片 */}
            <div className="group relative bg-gradient-card backdrop-blur-sm rounded-2xl p-8 border border-cosmic-gold/30 hover:border-cosmic-gold/70 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-cosmic rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-deep-space" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h2v8H7V7zm4 4h2v4h-2v-4zm4-2h2v6h-2V9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cosmic-gold mb-3">數據解析中心</h3>
                <p className="text-muted-foreground mb-6">分析黑塔的戰鬥數據與技能組合</p>
                <button 
                  className="w-full bg-space-purple/20 hover:bg-space-purple/40 text-cosmic-gold border border-cosmic-gold/30 hover:border-cosmic-gold rounded-xl py-3 transition-all duration-300"
                  onClick={() => {
                    // 數據流動特效
                    for (let i = 0; i < 20; i++) {
                      const data = document.createElement('div');
                      data.textContent = ['01', '10', '11', '00'][Math.floor(Math.random() * 4)];
                      data.className = 'fixed text-cosmic-gold text-sm pointer-events-none z-50 animate-data-flow';
                      data.style.left = Math.random() * window.innerWidth + 'px';
                      data.style.top = Math.random() * window.innerHeight + 'px';
                      document.body.appendChild(data);
                      setTimeout(() => data.remove(), 2000);
                    }
                    toast({
                      title: "數據分析完成",
                      description: "黑塔的戰鬥效率：672% 宇宙最強級別",
                    });
                  }}
                >
                  開始分析
                </button>
              </div>
            </div>

            {/* 虛擬實境體驗 */}
            <div className="group relative bg-gradient-card backdrop-blur-sm rounded-2xl p-8 border border-cosmic-gold/30 hover:border-cosmic-gold/70 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-space-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-space-blue to-space-purple rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-star-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cosmic-gold mb-3">AR 體驗模式</h3>
                <p className="text-muted-foreground mb-6">沉浸式黑塔世界探索</p>
                <button 
                  className="w-full bg-space-blue/20 hover:bg-space-blue/40 text-cosmic-gold border border-cosmic-gold/30 hover:border-cosmic-gold rounded-xl py-3 transition-all duration-300"
                  onClick={() => {
                    // 全螢幕特效
                    document.body.style.background = 'radial-gradient(circle, #7c3aed, #1e1b4b)';
                    setTimeout(() => {
                      document.body.style.background = '';
                    }, 3000);
                    
                    toast({
                      title: "AR 模式啟動",
                      description: "正在連接黑塔的虛擬空間...",
                    });
                  }}
                >
                  啟動 AR
                </button>
              </div>
            </div>

            {/* AI 對話系統 */}
            <div className="group relative bg-gradient-card backdrop-blur-sm rounded-2xl p-8 border border-cosmic-gold/30 hover:border-cosmic-gold/70 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-cosmic-gold to-space-purple rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-deep-space" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cosmic-gold mb-3">智能對話</h3>
                <p className="text-muted-foreground mb-6">與虛擬黑塔進行深度交流</p>
                <button 
                  className="w-full bg-cosmic-gold/20 hover:bg-cosmic-gold/40 text-cosmic-gold border border-cosmic-gold/30 hover:border-cosmic-gold rounded-xl py-3 transition-all duration-300"
                  onClick={() => {
                    const responses = [
                      "分析完畢：你的品味還算不錯",
                      "數據顯示：你確實具備成為我粉絲的潛質",
                      "計算結果：你的崇拜值已達到標準水準",
                      "評估完成：勉強認可你的存在"
                    ];
                    const response = responses[Math.floor(Math.random() * responses.length)];
                    
                    toast({
                      title: "虛擬黑塔回應",
                      description: response,
                    });
                  }}
                >
                  開始對話
                </button>
              </div>
            </div>
          </div>

          {/* 成就展示區 */}
          <div className="bg-gradient-to-r from-space-purple/30 to-cosmic-gold/20 backdrop-blur-sm rounded-3xl p-12 border border-cosmic-gold/30 mb-16">
            <h3 className="text-3xl font-bold text-cosmic-gold mb-8 text-center">
              探索成就系統
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: '初次訪問', desc: '發現黑塔宇宙', icon: '🌟', unlocked: true },
                { title: '數據探索者', desc: '體驗所有功能', icon: '📊', unlocked: false },
                { title: '互動達人', desc: '完成50次互動', icon: '🎯', unlocked: false },
                { title: '黑塔專家', desc: '掌握所有知識', icon: '🏆', unlocked: false }
              ].map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl border text-center transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-cosmic-gold/20 border-cosmic-gold text-cosmic-gold' 
                      : 'bg-muted/20 border-muted text-muted-foreground'
                  }`}
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h4 className="font-bold mb-2">{achievement.title}</h4>
                  <p className="text-sm">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 終極體驗按鈕 */}
          <div className="text-center">
            <button 
              className="group relative px-16 py-8 bg-gradient-cosmic rounded-2xl border-2 border-cosmic-gold hover:border-star-white transition-all duration-500 hover:scale-105 shadow-cosmic"
              onClick={() => {
                // 現代化特效
                const overlay = document.createElement('div');
                overlay.className = 'fixed inset-0 bg-gradient-cosmic opacity-0 z-50 pointer-events-none transition-opacity duration-1000';
                document.body.appendChild(overlay);
                
                setTimeout(() => overlay.style.opacity = '0.3', 100);
                setTimeout(() => {
                  overlay.remove();
                  toast({
                    title: "系統升級完成",
                    description: "您已解鎖黑塔宇宙的所有功能！",
                  });
                }, 2000);
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-star-white rounded-xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <svg className="w-6 h-6 text-deep-space" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-star-white group-hover:animate-shimmer">
                    解鎖完整體驗
                  </h3>
                  <p className="text-cosmic-gold">
                    進入黑塔的數位世界
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
