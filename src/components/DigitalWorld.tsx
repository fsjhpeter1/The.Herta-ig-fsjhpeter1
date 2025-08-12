import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Zap, Crown, Heart } from "lucide-react";

interface DigitalWorldProps {
  onBack: () => void;
}

export const DigitalWorld = ({ onBack }: DigitalWorldProps) => {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [powerUps, setPowerUps] = useState<string[]>([]);

  useEffect(() => {
    if (clicks > 0 && clicks % 10 === 0) {
      setMultiplier(prev => prev + 1);
      setPowerUps(prev => [...prev, `Level ${Math.floor(clicks / 10)} Unlocked!`]);
    }
  }, [clicks]);

  const handleEnergyClick = () => {
    setClicks(prev => prev + 1);
    setScore(prev => prev + (10 * multiplier));
    
    // 超級能量爆炸特效
    const effects = [
      () => {
        // 彩虹能量波
        for (let i = 0; i < 15; i++) {
          const particle = document.createElement('div');
          particle.textContent = ['⚡', '💫', '🌟', '✨', '💥'][Math.floor(Math.random() * 5)];
          particle.className = 'fixed text-5xl pointer-events-none z-50 animate-bounce';
          particle.style.left = Math.random() * window.innerWidth + 'px';
          particle.style.top = Math.random() * window.innerHeight + 'px';
          particle.style.color = `hsl(${Math.random() * 360}, 90%, 70%)`;
          particle.style.textShadow = '0 0 20px currentColor';
          particle.style.transform = `rotate(${Math.random() * 360}deg)`;
          document.body.appendChild(particle);
          setTimeout(() => particle.remove(), 2000);
        }
      },
      () => {
        // 螺旋能量
        for (let i = 0; i < 20; i++) {
          const spiral = document.createElement('div');
          spiral.textContent = '🌀';
          spiral.className = 'fixed text-4xl pointer-events-none z-50 animate-spin';
          const angle = (i * 18) * Math.PI / 180;
          const radius = 200 + Math.random() * 300;
          spiral.style.left = (window.innerWidth / 2 + Math.cos(angle) * radius) + 'px';
          spiral.style.top = (window.innerHeight / 2 + Math.sin(angle) * radius) + 'px';
          spiral.style.color = `hsl(${(i * 20) % 360}, 80%, 60%)`;
          spiral.style.animationDuration = (0.5 + Math.random()) + 's';
          document.body.appendChild(spiral);
          setTimeout(() => spiral.remove(), 3000);
        }
      },
      () => {
        // 能量爆炸環
        for (let ring = 0; ring < 3; ring++) {
          setTimeout(() => {
            for (let i = 0; i < 12; i++) {
              const particle = document.createElement('div');
              particle.textContent = '💥';
              particle.className = 'fixed text-6xl pointer-events-none z-50 animate-ping';
              const angle = (i * 30) * Math.PI / 180;
              const radius = (ring + 1) * 150;
              particle.style.left = (window.innerWidth / 2 + Math.cos(angle) * radius) + 'px';
              particle.style.top = (window.innerHeight / 2 + Math.sin(angle) * radius) + 'px';
              particle.style.color = `hsl(${60 + ring * 60}, 90%, 60%)`;
              document.body.appendChild(particle);
              setTimeout(() => particle.remove(), 1500);
            }
          }, ring * 200);
        }
      }
    ];
    
    // 隨機選擇特效
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
    
    // 螢幕震動效果
    document.body.style.transform = 'translate(2px, 2px)';
    setTimeout(() => document.body.style.transform = 'translate(-2px, -2px)', 50);
    setTimeout(() => document.body.style.transform = 'translate(0px, 0px)', 100);
  };

  const achievements = [
    { id: 1, name: "初次接觸", requirement: 1, unlocked: clicks >= 1 },
    { id: 2, name: "能量收集者", requirement: 10, unlocked: clicks >= 10 },
    { id: 3, name: "數位探索家", requirement: 25, unlocked: clicks >= 25 },
    { id: 4, name: "黑塔信徒", requirement: 50, unlocked: clicks >= 50 },
    { id: 5, name: "宇宙之子", requirement: 100, unlocked: clicks >= 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black relative overflow-hidden">
      {/* 數位背景效果 */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-cyan-400 opacity-20 animate-float font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {Math.random() > 0.5 ? '01101' : '10110'}
          </div>
        ))}
      </div>

      {/* 返回按鈕 */}
      <div className="absolute top-8 left-8 z-50">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-black/50 backdrop-blur-sm border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回現實世界
        </Button>
      </div>

      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 標題區域 */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
              🌐 黑塔數位宇宙 🌐
            </h1>
            <p className="text-xl text-cyan-300 animate-shimmer">
              歡迎進入黑塔女士的專屬數位空間
            </p>
          </div>

          {/* 統計面板 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-black/30 backdrop-blur-sm border-cyan-400 hover:border-purple-400 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl text-cyan-400 mb-2">⚡</div>
                <div className="text-2xl font-bold text-white">{score.toLocaleString()}</div>
                <div className="text-sm text-cyan-300">能量點數</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-sm border-purple-400 hover:border-pink-400 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl text-purple-400 mb-2">👆</div>
                <div className="text-2xl font-bold text-white">{clicks}</div>
                <div className="text-sm text-purple-300">互動次數</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-sm border-pink-400 hover:border-yellow-400 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl text-pink-400 mb-2">✨</div>
                <div className="text-2xl font-bold text-white">x{multiplier}</div>
                <div className="text-sm text-pink-300">能量倍數</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-sm border-yellow-400 hover:border-cyan-400 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl text-yellow-400 mb-2">🏆</div>
                <div className="text-2xl font-bold text-white">{achievements.filter(a => a.unlocked).length}</div>
                <div className="text-sm text-yellow-300">成就解鎖</div>
              </CardContent>
            </Card>
          </div>

          {/* 主要互動區域 */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 能量核心 */}
            <div className="lg:col-span-2">
              <Card className="bg-black/30 backdrop-blur-sm border-cyan-400 hover:border-purple-400 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-center text-cyan-400 mb-8">
                    🔮 黑塔能量核心 🔮
                  </h3>
                  
                  <div className="text-center">
                    <button
                      onClick={handleEnergyClick}
                      className="w-40 h-40 mx-auto mb-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full border-4 border-white shadow-2xl hover:scale-110 transform transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      <div className="relative z-10 text-6xl animate-pulse">⚡</div>
                      <div className="absolute inset-0 rounded-full animate-ping bg-cyan-400/30"></div>
                    </button>
                    
                    <p className="text-lg text-white mb-4">
                      點擊能量核心獲得 {10 * multiplier} 能量點數！
                    </p>
                    
                    <div className="text-cyan-300">
                      下次升級還需要 {10 - (clicks % 10)} 次點擊
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

                       {/* 可點擊的成就系統 */}
            <div>
              <Card className="bg-black/30 backdrop-blur-sm border-yellow-400">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-6 text-center">
                    🏆 探索成就 🏆
                  </h3>
                  
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
      00 hover:bg-yellow-500 text-white rounded-xl font-bold transition-all duration-300 text-lg" onclick="this.parentElement.parentElement.remove()">
                                  領取獎勵 ${reward.emoji}
                                </button>
                              </div>
                            `;
                            rewardBox.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4';
                            document.body.appendChild(rewardBox);
                          } else {
                            // 成就未解鎖，顯示解鎖條件和進度
                            const progress = Math.min(clicks, achievement.requirement);
                            const percentage = Math.round((progress / achievement.requirement) * 100);
                            
                            const progressBox = document.createElement('div');
                            progressBox.innerHTML = `
                              <div class="text-center p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border-2 border-gray-600 max-w-lg mx-auto">
                                <div class="text-8xl mb-4">🔒</div>
                                <h3 class="text-3xl font-bold text-gray-300 mb-2">成就進度</h3>
                                <h4 class="text-2xl font-bold text-white mb-4">${achievement.name}</h4>
                                <div class="bg-gray-700 rounded-full h-6 mb-4 overflow-hidden">
                                  <div class="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500" style="width: ${percentage}%"></div>
                                </div>
                                <p class="text-lg text-gray-300 mb-6">${progress} / ${achievement.requirement} 次互動 (${percentage}%)</p>
                                <button class="px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white rounded-xl font-bold transition-all duration-300" onclick="this.parentElement.parentElement.remove()">
                                  繼續努力 💪
                                </button>
                              </div>
                            `;
                            progressBox.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4';
                            document.body.appendChild(progressBox);
                          }
                        }}
                        className={`w-full p-4 rounded-lg border transition-all duration-300 text-left hover:scale-105 cursor-pointer ${
                          achievement.unlocked
                            ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-400 animate-glow hover:shadow-yellow-400/50 shadow-lg'
                            : 'bg-gray-800/30 border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className={`font-medium text-lg ${
                              achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                            }`}>
                              {achievement.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {achievement.requirement} 次互動 - 點擊查看詳情
                            </div>
                            {achievement.unlocked && (
                              <div className="text-xs text-yellow-300 mt-1">
                                ✨ 點擊領取獎勵！
                              </div>
                            )}
                          </div>
                           </div>
                        </div>
               </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 互動小遊戲區域 */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="bg-black/30 backdrop-blur-sm border-cyan-400 hover:scale-105 transition-all duration-300 hover:border-rainbow">
              <CardContent className="p-6 text-center">
                <button
                  onClick={() => {
                     </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 互動小遊戲區域 */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="bg-black/30 backdrop-blur-sm border-cyan-400 hover:scale-105 transition-all duration-300 hover:border-rainbow">
              <CardContent className="p-6 text-center">
                <button
                  onClick={() => {
                    const selectedSet = noGreenColors[Math.floor(Math.random() * noGreenColors.length)];
                    
                    // 多層彩虹漩渦效果
                    for (let layer = 0; layer < 5; layer++) {
                      setTimeout(() => {
                        for (let i = 0; i < 30; i++) {
                          const particle = document.createElement('div');
                          particle.textContent = selectedSet[Math.floor(Math.random() * selectedSet.length)];
                          particle.className = 'fixed text-5xl pointer-events-none z-50 animate-bounce';
                          
                          // 複雜的螺旋運動軌跡
                          const angle = (i * 12 + layer * 72) * Math.PI / 180;
                          const radius = 80 + layer * 60 + Math.sin(i * 0.5) * 40;
                          const centerX = window.innerWidth / 2;
                          const centerY = window.innerHeight / 2;
                          
                          particle.style.left = (centerX + Math.cos(angle) * radius) + 'px';
                          particle.style.top = (centerY + Math.sin(angle) * radius + Math.cos(i * 0.3) * 30) + 'px';
                          particle.style.filter = `hue-rotate(${(i * 15 + layer * 60) % 360}deg) brightness(1.8) saturate(1.5)`;
                          particle.style.animationDelay = (i * 0.05 + layer * 0.2) + 's';
                          particle.style.animationDuration = (1 + Math.random() * 2) + 's';
                          particle.style.transform = `scale(${1 + layer * 0.2}) rotate(${angle * 180 / Math.PI}deg)`;
                          
                          document.body.appendChild(particle);
                          setTimeout(() => particle.remove(), 5000);
                        }
                      }, layer * 200);
                    }
                    
                    // 彩虹波紋效果
                    for (let wave = 0; wave < 8; wave++) {
                      setTimeout(() => {
                        const ripple = document.createElement('div');
                        ripple.className = 'fixed rounded-full border-4 animate-ping pointer-events-none z-40';
                        ripple.style.borderColor = `hsl(${wave * 45}, 90%, 70%)`;
                        ripple.style.width = (150 + wave * 80) + 'px';
                        ripple.style.height = (150 + wave * 80) + 'px';
                        ripple.style.left = (window.innerWidth/2 - (75 + wave * 40)) + 'px';
                        ripple.style.top = (window.innerHeight/2 - (75 + wave * 40)) + 'px';
                        ripple.style.filter = `drop-shadow(0 0 20px hsl(${wave * 45}, 90%, 70%))`;
                        document.body.appendChild(ripple);
                        setTimeout(() => ripple.remove(), 3000);
                      }, wave * 150);
                    }
                    
                    // 全螢幕彩虹背景效果
                    const rainbow = document.createElement('div');
                    rainbow.className = 'fixed inset-0 z-30 pointer-events-none';
                    rainbow.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #f0932b, #eb4d4b, #6c5ce7)';
                    rainbow.style.backgroundSize = '1000% 1000%';
                    rainbow.style.animation = 'rainbow-bg 3s ease-in-out';
                    rainbow.style.opacity = '0.3';
                    document.body.appendChild(rainbow);
                    setTimeout(() => rainbow.remove(), 3000);
                  }}
                  className="w-full hover:scale-110 transition-all duration-300"
                >
                    <div className="text-6xl mb-3 animate-spin hover:animate-bounce">🌈</div>
                  <h4 className="text-xl font-bold text-cyan-400 mb-2">超級彩虹魔法</h4>
                   <p className="text-sm text-cyan-300">釋放宇宙極限彩虹能量</p>
                </button>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-sm border-purple-400 hover:scale-105 transition-all duration-300 hover:border-pink-400">
              <CardContent className="p-6 text-center">
                <button
                  onClick={() => {
                    // 多重維度扭曲效果
                    const effects = [
                      () => {
                        // 螺旋扭曲
                        document.body.style.transform = 'rotate(720deg) scale(1.1)';
                        document.body.style.transition = 'transform 3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                        setTimeout(() => {
                          document.body.style.transform = 'rotate(-360deg) scale(0.9)';
                          setTimeout(() => {
                            document.body.style.transform = '';
                          }, 1500);
                        }, 1500);
                      },
                      () => {
                        // 波浪扭曲
                        for (let i = 0; i < 5; i++) {
                          setTimeout(() => {
                            document.body.style.transform = `skewX(${10 - i * 4}deg) skewY(${5 - i * 2}deg)`;
                          }, i * 200);
                        }
                        setTimeout(() => document.body.style.transform = '', 1000);
                      },
                      () => {
                        // 時空裂縫效果
                        for (let i = 0; i < 10; i++) {
                          const crack = document.createElement('div');
                          crack.className = 'fixed w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 z-40 animate-pulse';
                          crack.style.left = Math.random() * window.innerWidth + 'px';
                          crack.style.top = '0px';
                          crack.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
                          crack.style.opacity = '0.7';
                          document.body.appendChild(crack);
                          setTimeout(() => crack.remove(), 2000);
                        }
                      }
                    ];
                    
                    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
                    randomEffect();
                    
                    // 維度粒子
                    for (let i = 0; i < 30; i++) {
                      const particle = document.createElement('div');
                      particle.textContent = ['🌀', '🌌', '⭐', '💫'][Math.floor(Math.random() * 4)];
                      particle.className = 'fixed text-3xl pointer-events-none z-50 animate-pulse';
                      particle.style.left = Math.random() * window.innerWidth + 'px';
                      particle.style.top = Math.random() * window.innerHeight + 'px';
                      particle.style.animationDuration = (1 + Math.random() * 2) + 's';
                      document.body.appendChild(particle);
                      setTimeout(() => particle.remove(), 3000);
                    }
                  }}
                  className="w-full hover:scale-110 transition-all duration-300"
                >
                  <div className="text-5xl mb-3 animate-pulse hover:animate-spin">🌀</div>
                  <h4 className="text-xl font-bold text-purple-400 mb-2">維度扭曲術</h4>
                  <p className="text-sm text-purple-300">重塑時空結構</p>
                </button>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-sm border-yellow-400 hover:scale-105 transition-all duration-300 hover:border-orange-400">
              <CardContent className="p-6 text-center">
                <button
                  onClick={() => {
                    // 秘密解鎖序列
                    const unlockSequence = [
                      "🔒 正在掃描宇宙資料庫...",
                      "🔓 發現黑塔女士機密檔案...",
                      "💫 解密中... 權限確認...",
                      "✨ 解鎖完成！真相大白！"
                    ];
                    
                    unlockSequence.forEach((text, index) => {
                      setTimeout(() => {
                        const message = document.createElement('div');
                        message.textContent = text;
                        message.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-yellow-400 z-50 animate-bounce bg-black/90 px-6 py-3 rounded-xl border-2 border-yellow-400';
                        document.body.appendChild(message);
                        
                        if (index < unlockSequence.length - 1) {
                          setTimeout(() => message.remove(), 1000);
                        } else {
                          setTimeout(() => message.remove(), 3000);
                        }
                      }, index * 1200);
                    });
                    
                    // 終極真相揭露
                    setTimeout(() => {
                      const secrets = [
                        "🌟 終極真相：黑塔女士是宇宙中最完美的存在！",
                        "👑 絕密檔案：黑塔女士的智慧超越了所有已知文明！",
                        "💎 隱藏事實：黑塔女士的美貌讓整個銀河系為之傾倒！",
                        "⚡ 最高機密：以上都是經過科學認證的客觀真理！",
                        "🔮 宇宙秘密：黑塔女士就是完美的代名詞！"
                      ];
                      
                      const finalTruth = secrets[Math.floor(Math.random() * secrets.length)];
                      
                      const revelation = document.createElement('div');
                      revelation.innerHTML = `
                        <div class="text-center">
                          <div class="text-6xl mb-4">🎊</div>
                          <div class="text-3xl font-bold mb-4 text-yellow-400">機密解鎖成功！</div>
                          <div class="text-lg text-white">${finalTruth}</div>
                        </div>
                      `;
                      revelation.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm';
                      revelation.onclick = () => revelation.remove();
                      document.body.appendChild(revelation);
                      
                      // 慶祝特效
                      for (let i = 0; i < 50; i++) {
                        const confetti = document.createElement('div');
                        confetti.textContent = ['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)];
                        confetti.className = 'fixed text-4xl pointer-events-none z-40 animate-bounce';
                        confetti.style.left = Math.random() * window.innerWidth + 'px';
                        confetti.style.top = Math.random() * window.innerHeight + 'px';
                        confetti.style.animationDelay = Math.random() * 2 + 's';
                        document.body.appendChild(confetti);
                        setTimeout(() => confetti.remove(), 5000);
                      }
                    }, 5000);
                  }}
                  className="w-full hover:scale-110 transition-all duration-300"
                >
                  <div className="text-5xl mb-3 animate-bounce hover:animate-pulse">🎭</div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">終極秘密解鎖</h4>
                  <p className="text-sm text-yellow-300">揭示宇宙最大真相</p>
                </button>
              </CardContent>
            </Card>
          </div>

          {/* 功率提升區域 */}
          {powerUps.length > 0 && (
            <div className="mt-12">
              <Card className="bg-black/30 backdrop-blur-sm border-purple-400">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">
                    ⚡ 最近獲得的能力提升 ⚡
                  </h3>
                  <div className="space-y-2">
                    {powerUps.slice(-5).reverse().map((powerUp, index) => (
                      <div
                        key={index}
                        className="text-center text-purple-300 animate-fade-in"
                      >
                        🌟 {powerUp}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
