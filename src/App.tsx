import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Bot,
  Download,
  Apple,
  Monitor,
  ChevronRight,
  ChevronDown,
  Terminal,
  CheckCircle2,
  Sparkles,
  Eye,
  Cpu,
  Menu,
  X,
  AlertTriangle,
  Copy,
  Check,
  ArrowRight,
  Zap,
  Shield,
  Database,
  Play,
  Settings,
  FileText,
  Moon,
  Sun
} from 'lucide-react'
import './App.css'

// =============================================================================
// CONFIGURATION
// =============================================================================
const DOWNLOAD_BASE_URL = import.meta.env.VITE_DOWNLOAD_BASE_URL || "https://inboxhunter-releases.s3.us-east-1.amazonaws.com/releases/latest"
const CURRENT_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0"
const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || "support@inboxhunter.com"

// =============================================================================
// Types
// =============================================================================
type Page = 'home' | 'getting-started' | 'how-it-works' | 'faq'

// =============================================================================
// OS Detection
// =============================================================================
type DetectedOS = 'mac-arm' | 'windows' | 'unknown'

function detectOS(): DetectedOS {
  const userAgent = navigator.userAgent.toLowerCase()
  const platform = navigator.platform.toLowerCase()
  
  // macOS - only Apple Silicon supported for now
  if (platform.includes('mac') || userAgent.includes('mac')) {
    return 'mac-arm'
  }
  
  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows'
  }
  
  return 'unknown'
}

// =============================================================================
// Animation
// =============================================================================
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

// =============================================================================
// Components
// =============================================================================

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400 hover:text-white" />}
    </button>
  )
}

function Navbar({ 
  currentPage, 
  setCurrentPage,
  isDark,
  toggleTheme
}: { 
  currentPage: Page
  setCurrentPage: (page: Page) => void
  isDark: boolean
  toggleTheme: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'how-it-works' as Page, label: 'How It Works' },
    { id: 'getting-started' as Page, label: 'Getting Started' },
    { id: 'faq' as Page, label: 'FAQ' },
  ]

  const scrollToDownload = () => {
    // If not on home page, go to home first
    if (currentPage !== 'home') {
      setCurrentPage('home')
      // Wait for page change, then scroll
      setTimeout(() => {
        document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors ${
      isDark ? 'bg-[#0a0a0f]/95 border-white/5' : 'bg-white/95 border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? 'from-white to-gray-300' : 'from-gray-900 to-gray-600'
            }`}>InboxHunter</span>
          </button>
          
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === link.id 
                    ? isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'
                    : isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`ml-2 p-2.5 rounded-xl transition-all ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Download Button */}
            <button
              onClick={scrollToDownload}
              className="ml-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
          
          <div className="flex items-center gap-2 md:hidden">
            {/* Download Button Mobile */}
            <button
              onClick={scrollToDownload}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden xs:inline">Download</span>
            </button>
            
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 flex flex-col gap-2"
            >
              {links.map(link => (
                <button
                  key={link.id}
                  onClick={() => { setCurrentPage(link.id); setIsOpen(false) }}
                  className={`text-left py-3 px-4 rounded-lg transition-colors ${
                    currentPage === link.id 
                      ? isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'
                      : isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function DownloadCard({ 
  download, 
  isRecommended, 
  getDownloadUrl,
  isDark
}: { 
  download: {
    id: string
    name: string
    subtitle: string
    icon: React.ComponentType<{ className?: string }>
    fileName: string
    postInstall: { command: string | null; description: string }
  }
  isRecommended: boolean
  getDownloadUrl: (fileName: string) => string
  isDark: boolean
}) {
  const Icon = download.icon
  
  // Theme-aware classes
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  
  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all ${
        isRecommended
          ? isDark 
            ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 shadow-xl shadow-blue-500/10'
            : 'border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl shadow-blue-100'
          : isDark
            ? 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
            : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold shadow-lg">
            Recommended for you
          </span>
        </div>
      )}
      
      <div className="flex flex-col items-center text-center mb-6">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${
          isRecommended 
            ? isDark ? 'bg-blue-500/20' : 'bg-blue-100'
            : isDark ? 'bg-white/5' : 'bg-gray-100'
        }`}>
          <Icon className={`w-10 h-10 ${isRecommended ? 'text-blue-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <div className={`text-xl font-semibold ${textPrimary}`}>{download.name}</div>
        <div className={`text-sm ${textSecondary}`}>{download.subtitle}</div>
      </div>
      
      <a
        href={getDownloadUrl(download.fileName)}
        download
        className={`w-full py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
          isRecommended
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/25'
            : isDark 
              ? 'bg-white/10 hover:bg-white/15 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
        }`}
      >
        <Download className="w-5 h-5" />
        Download v{CURRENT_VERSION}
      </a>
      
      {/* Post-install instructions - Always visible with proper styling */}
      <div className={`mt-5 p-4 rounded-xl border ${
        isDark
          ? isRecommended ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-500/5 border-amber-500/20'
          : 'bg-amber-50 border-amber-200'
      }`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-amber-600 mb-1.5">After Installing:</div>
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{download.postInstall.description}</p>
            {download.postInstall.command && (
              <div className={`flex items-center gap-2 rounded-lg px-3 py-2.5 border ${isDark ? 'bg-black/40 border-white/5' : 'bg-gray-900 border-gray-800'}`}>
                <code className="text-sm text-emerald-400 flex-1 font-mono break-all">
                  {download.postInstall.command}
                </code>
                <CopyButton text={download.postInstall.command} />
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function HomePage({ setCurrentPage, isDark }: { setCurrentPage: (page: Page) => void; isDark: boolean }) {
  const [detectedOS, setDetectedOS] = useState<DetectedOS>('unknown')
  const [showAllDownloads, setShowAllDownloads] = useState(false)
  
  useEffect(() => {
    setDetectedOS(detectOS())
  }, [])

  const downloads = [
    {
      id: 'mac-arm',
      name: 'macOS',
      subtitle: 'Apple Silicon (M-series)',
      icon: Apple,
      fileName: `InboxHunter_${CURRENT_VERSION}_aarch64.dmg`,
      postInstall: {
        command: 'xattr -cr /Applications/InboxHunter.app',
        description: 'Open Terminal and run this command to enable the app:'
      }
    },
    // Intel Mac commented out for now
    // {
    //   id: 'mac-intel',
    //   name: 'macOS',
    //   subtitle: 'Intel Processor',
    //   icon: Apple,
    //   fileName: `InboxHunter_${CURRENT_VERSION}_x64.dmg`,
    //   postInstall: {
    //     command: 'xattr -cr /Applications/InboxHunter.app',
    //     description: 'Open Terminal and run this command to enable the app:'
    //   }
    // },
    {
      id: 'windows',
      name: 'Windows',
      subtitle: '64-bit (Windows 10/11)',
      icon: Monitor,
      fileName: `InboxHunter_${CURRENT_VERSION}_x64-setup.exe`,
      postInstall: {
        command: null,
        description: 'If Windows SmartScreen appears, click "More info" then "Run anyway" to continue installation.'
      }
    },
    // Linux builds are currently disabled
    // {
    //   id: 'linux',
    //   name: 'Linux',
    //   subtitle: 'AppImage (Universal)',
    //   icon: Terminal,
    //   fileName: `inbox-hunter_${CURRENT_VERSION}_amd64.AppImage`,
    //   postInstall: {
    //     command: 'chmod +x inbox-hunter_*.AppImage && ./inbox-hunter_*.AppImage',
    //     description: 'Make the file executable and run it:'
    //   }
    // },
    // {
    //   id: 'linux-deb',
    //   name: 'Linux',
    //   subtitle: 'Debian/Ubuntu (.deb)',
    //   icon: Terminal,
    //   fileName: `inbox-hunter_${CURRENT_VERSION}_amd64.deb`,
    //   postInstall: {
    //     command: 'sudo dpkg -i inbox-hunter_*.deb',
    //     description: 'Install using your package manager:'
    //   }
    // },
  ]

  const getDownloadUrl = (fileName: string) => `${DOWNLOAD_BASE_URL}/${fileName}`
  
  const recommendedDownload = downloads.find(d => d.id === detectedOS) || downloads[0]
  const otherDownloads = downloads.filter(d => d.id !== recommendedDownload.id)

  const osDisplayName = {
    'mac-arm': 'macOS (Apple Silicon)',
    'windows': 'Windows',
    'unknown': 'your system'
  }

  // Theme-aware classes
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500'
  const cardBg = isDark ? 'bg-white/[0.02] border-white/5 hover:border-white/10' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
  const pillBg = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeIn} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-8 ${isDark ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Powered by GPT-4 Vision</span>
          </motion.div>
          
            <motion.h1 variants={fadeIn} className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${textPrimary}`}>
            AI-Powered
            <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Lead Generation</span>
          </motion.h1>
          
            <motion.p variants={fadeIn} className={`text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${textSecondary}`}>
            Automatically sign up for competitor email lists using intelligent AI form filling. 
            Research competitor strategies effortlessly.
          </motion.p>
          
            {/* Features Grid */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: Eye, text: 'Vision AI', desc: 'Form Detection' },
                { icon: Bot, text: 'Auto Fill', desc: 'Smart Forms' },
                { icon: Shield, text: 'Stealth', desc: 'Anti-Detection' },
                { icon: Zap, text: 'CAPTCHA', desc: 'Auto Solving' },
              ].map((feature, i) => (
                <div key={i} className={`p-5 rounded-xl border transition-colors group flex flex-col items-center text-center ${cardBg}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                    <feature.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className={`text-sm font-semibold ${textPrimary}`}>{feature.text}</div>
                  <div className={`text-xs ${textMuted}`}>{feature.desc}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
              </div>
      </section>
              
      {/* Download Section */}
      <section id="download" className={`py-20 px-6 ${isDark ? 'bg-gradient-to-b from-blue-500/5 via-transparent to-transparent' : 'bg-gradient-to-b from-blue-50 via-transparent to-transparent'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }}>
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-4 ${textPrimary}`}>Download InboxHunter</h2>
              <p className={`text-lg ${textSecondary}`}>
                Version {CURRENT_VERSION} • Free to use • No account required
              </p>
              
              {/* Detected OS indicator */}
              <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border ${pillBg}`}>
                <Cpu className="w-4 h-4 text-blue-500" />
                <span className={`text-sm ${textSecondary}`}>
                  We detected <span className={`font-medium ${textPrimary}`}>{osDisplayName[detectedOS]}</span>
                </span>
                      </div>
            </motion.div>
                    
            {/* Recommended Download - Full Width */}
            <motion.div variants={fadeIn} className="mb-8">
              <DownloadCard 
                download={recommendedDownload} 
                isRecommended={true}
                getDownloadUrl={getDownloadUrl}
                isDark={isDark}
              />
            </motion.div>

            {/* Other Downloads Toggle */}
            <motion.div variants={fadeIn}>
              <button
                onClick={() => setShowAllDownloads(!showAllDownloads)}
                className={`w-full py-4 flex items-center justify-center gap-2 transition-colors border rounded-xl ${
                  isDark 
                    ? 'text-gray-400 hover:text-white border-white/5 hover:bg-white/[0.02]' 
                    : 'text-gray-600 hover:text-gray-900 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${showAllDownloads ? 'rotate-180' : ''}`} />
                <span className="font-medium">
                  {showAllDownloads ? 'Hide other options' : 'Show all download options'}
                </span>
              </button>
              
              {showAllDownloads && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-4 mt-6"
                >
                  {otherDownloads.map((download) => (
                    <DownloadCard
                      key={download.id + download.subtitle}
                      download={download}
                      isRecommended={false}
                      getDownloadUrl={getDownloadUrl}
                      isDark={isDark}
                    />
                      ))}
                </motion.div>
              )}
            </motion.div>
        </motion.div>
      </div>
    </section>

      {/* Learn More Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }}>
            <motion.h2 variants={fadeIn} className={`text-2xl font-bold text-center mb-10 ${textPrimary}`}>
              Learn More
            </motion.h2>
            
            <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-5">
              {[
                { 
                  page: 'how-it-works' as Page, 
                  icon: Play,
                  title: 'How It Works', 
                  desc: 'Understand the automation process step by step'
                },
                {
                  page: 'getting-started' as Page,
                  icon: Settings, 
                  title: 'Getting Started', 
                  desc: 'Complete setup and configuration guide'
                },
                {
                  page: 'faq' as Page,
                  icon: FileText, 
                  title: 'FAQ', 
                  desc: 'Answers to commonly asked questions'
                },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`p-6 rounded-2xl border transition-all text-left group ${
                    isDark 
                      ? 'border-white/10 bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/5' 
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 shadow-sm'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-lg font-semibold ${textPrimary}`}>{item.title}</span>
                    <ArrowRight className={`w-5 h-5 group-hover:text-blue-500 group-hover:translate-x-1 transition-all ${textSecondary}`} />
                  </div>
                  <p className={`text-sm leading-relaxed ${textSecondary}`}>{item.desc}</p>
                </button>
              ))}
        </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact/Support */}
      <section className={`py-20 px-6 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }}>
            <motion.div variants={fadeIn}>
              <h2 className={`text-3xl font-bold mb-4 ${textPrimary}`}>Need Help?</h2>
              <p className={`mb-8 text-lg ${textSecondary}`}>
                Have questions or running into issues? We're here to help.
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity items-center justify-center gap-3 font-medium text-white"
              >
                <Mail className="w-5 h-5" />
                {SUPPORT_EMAIL}
              </a>
              </motion.div>
        </motion.div>
      </div>
    </section>

      {/* Footer */}
      <footer className={`py-10 px-6 border-t ${isDark ? 'border-white/5 bg-black/20' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className={`font-bold ${textPrimary}`}>InboxHunter</div>
              <div className={`text-xs ${textMuted}`}>AI Lead Generation</div>
            </div>
          </div>
          <div className={`flex items-center gap-6 text-sm ${textMuted}`}>
            <button onClick={() => setCurrentPage('how-it-works')} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>How It Works</button>
            <button onClick={() => setCurrentPage('getting-started')} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Getting Started</button>
            <button onClick={() => setCurrentPage('faq')} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>FAQ</button>
          </div>
          <div className={`text-sm ${textMuted}`}>
            © 2024 InboxHunter. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function HowItWorksPage({ setCurrentPage, isDark }: { setCurrentPage: (page: Page) => void; isDark: boolean }) {
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const cardBg = isDark ? 'bg-white/[0.02] border-white/10 hover:border-blue-500/30' : 'bg-white border-gray-200 hover:border-blue-300 shadow-sm'

  const steps = [
    {
      step: '01',
      title: 'Configure Your Credentials',
      description: 'Enter your signup details (email, name, phone) in the Settings tab. These will be used to fill out forms automatically.',
      icon: Settings
    },
    {
      step: '02',
      title: 'Choose Your Data Source',
      description: 'Either scrape landing pages from Meta Ads Library using keywords, or import your own list of URLs from a CSV file.',
      icon: Database
    },
    {
      step: '03',
      title: 'Start the Automation',
      description: 'Click "Start Bot" and watch the AI navigate to each page, analyze forms using GPT-4 Vision, and complete signups automatically.',
      icon: Play
    },
    {
      step: '04',
      title: 'Review Your Results',
      description: 'Track progress in real-time on the Dashboard. View detailed logs and all completed signups in the local database.',
      icon: CheckCircle2
    },
  ]

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.button 
            variants={fadeIn}
            onClick={() => setCurrentPage('home')} 
            className={`flex items-center gap-2 mb-10 group transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
          
          <motion.div variants={fadeIn} className="mb-12">
            <h1 className={`text-4xl font-bold mb-4 ${textPrimary}`}>How It Works</h1>
            <p className={`text-xl ${textSecondary}`}>A simple 4-step process to automate your lead generation</p>
        </motion.div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className={`flex gap-6 p-6 rounded-2xl border transition-colors ${cardBg}`}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-sm text-blue-500 font-semibold mb-1">Step {step.step}</div>
                  <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{step.title}</h3>
                  <p className={`leading-relaxed ${textSecondary}`}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeIn} className={`mt-12 p-6 rounded-2xl border ${isDark ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Eye className="w-6 h-6 text-blue-500" />
                </div>
              <div>
                <h3 className={`font-semibold text-lg mb-2 ${textPrimary}`}>AI-Powered Intelligence</h3>
                <p className={`leading-relaxed ${textSecondary}`}>
                  InboxHunter uses GPT-4 Vision to analyze screenshots of web pages, understanding form layouts, 
                  field types, and button locations just like a human would. This allows it to handle virtually 
                  any form design without manual configuration.
                </p>
              </div>
            </div>
              </motion.div>

          <motion.div variants={fadeIn} className="mt-10 flex justify-center">
            <button
              onClick={() => setCurrentPage('getting-started')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-medium flex items-center gap-2 hover:opacity-90 transition-opacity text-white"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function GettingStartedPage({ setCurrentPage, isDark }: { setCurrentPage: (page: Page) => void; isDark: boolean }) {
  const [activeTab, setActiveTab] = useState<'install' | 'setup' | 'run'>('install')

  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const textStep = isDark ? 'text-gray-300' : 'text-gray-700'
  const cardBg = isDark ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-white shadow-sm'
  const codeBg = isDark ? 'bg-black/40 border-white/5' : 'bg-gray-900 border-gray-800'

  const tabs = [
    { id: 'install' as const, label: 'Installation', icon: Download },
    { id: 'setup' as const, label: 'Configuration', icon: Settings },
    { id: 'run' as const, label: 'Running', icon: Play },
  ]

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.button 
            variants={fadeIn}
            onClick={() => setCurrentPage('home')} 
            className={`flex items-center gap-2 mb-10 group transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
          
          <motion.div variants={fadeIn} className="mb-10">
            <h1 className={`text-4xl font-bold mb-4 ${textPrimary}`}>Getting Started</h1>
            <p className={`text-xl ${textSecondary}`}>Complete guide to set up and use InboxHunter</p>
        </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeIn} className={`flex gap-2 mb-8 p-1.5 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-gray-200'}`}>
            {tabs.map((tab) => (
                  <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
        </button>
            ))}
        </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'install' && (
        <motion.div
                key="install"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* macOS Installation */}
                <div className={`p-6 rounded-2xl border ${cardBg}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <Apple className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
                    <h3 className={`text-xl font-semibold ${textPrimary}`}>macOS</h3>
                  </div>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={textStep}>Download the .dmg file (Apple Silicon or Intel)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={textStep}>Open the DMG and drag InboxHunter to Applications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-amber-600">Open Terminal and run this command:</span>
                        <div className={`flex items-center gap-2 mt-2 rounded-lg px-4 py-3 border ${codeBg}`}>
                          <code className="text-emerald-400 font-mono text-sm flex-1">xattr -cr /Applications/InboxHunter.app</code>
                          <CopyButton text="xattr -cr /Applications/InboxHunter.app" />
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Windows Installation */}
                <div className={`p-6 rounded-2xl border ${cardBg}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <Monitor className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <h3 className={`text-xl font-semibold ${textPrimary}`}>Windows</h3>
                  </div>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={textStep}>Download the .exe installer</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={textStep}>Run the installer and follow the prompts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-amber-600">If SmartScreen appears: Click "More info" → "Run anyway"</span>
                    </li>
                  </ol>
                </div>

                {/* Linux Installation */}
                <div className={`p-6 rounded-2xl border ${cardBg}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <Terminal className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <h3 className={`text-xl font-semibold ${textPrimary}`}>Linux</h3>
                  </div>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={textStep}>Download AppImage or .deb package</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className={textStep}>For AppImage, make it executable:</span>
                        <div className={`flex items-center gap-2 mt-2 rounded-lg px-4 py-3 border ${codeBg}`}>
                          <code className="text-emerald-400 font-mono text-sm flex-1">chmod +x inbox-hunter_*.AppImage</code>
                          <CopyButton text="chmod +x inbox-hunter_*.AppImage" />
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className={textStep}>For .deb, install with:</span>
                        <div className={`flex items-center gap-2 mt-2 rounded-lg px-4 py-3 border ${codeBg}`}>
                          <code className="text-emerald-400 font-mono text-sm flex-1">sudo dpkg -i inbox-hunter_*.deb</code>
                          <CopyButton text="sudo dpkg -i inbox-hunter_*.deb" />
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </motion.div>
            )}

            {activeTab === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {[
                  {
                    number: '1',
                    title: 'Enter Your Credentials',
                    description: 'Go to Settings → Credentials and fill in:',
                    items: ['First Name & Last Name', 'Email address (use a catch-all or alias)', 'Phone number with country code']
                  },
                  {
                    number: '2',
                    title: 'Add API Keys',
                    description: 'Go to Settings → API Keys:',
                    items: [
                      { text: 'OpenAI API Key (Required)', link: 'https://platform.openai.com/api-keys', required: true },
                      { text: '2Captcha API Key (Optional)', desc: 'For automatic CAPTCHA solving', required: false }
                    ]
                  },
                  {
                    number: '3',
                    title: 'Choose Data Source',
                    description: 'Go to Settings → Data Source:',
                    options: [
                      { name: 'Meta Ads Library', desc: 'Scrape landing pages from Facebook/Instagram ads' },
                      { name: 'CSV File', desc: 'Import your own list of URLs' }
                    ]
                  }
                ].map((section, i) => (
                  <div key={i} className={`p-6 rounded-2xl border ${cardBg}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
                        {section.number}
                      </div>
                      <h3 className={`text-xl font-semibold ${textPrimary}`}>{section.title}</h3>
                    </div>
                    <p className={`mb-4 ${textSecondary}`}>{section.description}</p>
                    
                    {section.items && (
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className={`flex items-center gap-2 ${textStep}`}>
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            {typeof item === 'string' ? item : (
                              <span>
                                <span className={item.required ? `font-medium ${textPrimary}` : textSecondary}>{item.text}</span>
                                {item.link && (
                                  <a href={item.link} target="_blank" className="text-blue-500 hover:underline ml-1">Get it here →</a>
                                )}
                                {item.desc && <span className={`text-sm ml-2 ${textSecondary}`}>({item.desc})</span>}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.options && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.options.map((opt, j) => (
                          <div key={j} className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                            <h4 className={`font-semibold mb-1 ${textPrimary}`}>{opt.name}</h4>
                            <p className={`text-sm ${textSecondary}`}>{opt.desc}</p>
                    </div>
              ))}
            </div>
                    )}
          </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'run' && (
              <motion.div
                key="run"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className={`p-6 rounded-2xl border ${cardBg}`}>
                  <h3 className={`text-xl font-semibold mb-6 ${textPrimary}`}>Starting the Bot</h3>
                  <ol className="space-y-5">
                    {[
                      'Click the "Start Bot" button in the header',
                      'Watch the Dashboard for real-time progress and stats',
                      'View detailed activity in the Logs tab',
                      'Click "Stop" anytime to pause the automation'
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                          {i + 1}
                        </span>
                        <span className={`pt-1 ${textStep}`}>{step}</span>
                      </li>
                    ))}
                  </ol>
                        </div>

                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                  <h3 className="font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    What the Bot Does Automatically
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {[
                      'Navigates to each landing page',
                      'Analyzes forms using GPT-4 Vision',
                      'Fills out email, name, phone fields',
                      'Handles checkboxes and dropdowns',
                      'Solves CAPTCHAs (with 2Captcha)',
                      'Submits and verifies success'
                    ].map((item, i) => (
                      <li key={i} className={`flex items-center gap-2 text-sm ${textStep}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {item}
                            </li>
                          ))}
                        </ul>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
          </div>
        </div>
  )
}

function FAQPage({ setCurrentPage, isDark }: { setCurrentPage: (page: Page) => void; isDark: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'

  const faqs = [
    {
      question: 'Is InboxHunter free to use?',
      answer: 'Yes, InboxHunter is completely free to download and use. However, you\'ll need an OpenAI API key for the AI features, which has its own usage costs (approximately $0.01-0.05 per form filled with GPT-4o).'
    },
    {
      question: 'Why does macOS say the app is "damaged" or won\'t open?',
      answer: 'This happens because the app isn\'t notarized with Apple (which costs $99/year). The app is completely safe. To fix it, open Terminal and run: xattr -cr /Applications/InboxHunter.app'
    },
    {
      question: 'Why does Windows SmartScreen show a warning?',
      answer: 'The app isn\'t signed with a Windows code signing certificate (which is expensive). The app is safe to use. Just click "More info" and then "Run anyway" to proceed with installation.'
    },
    {
      question: 'What\'s the success rate for form filling?',
      answer: 'InboxHunter achieves 90-100% success rate on standard opt-in forms. The AI can handle multi-step forms, hidden checkboxes, and complex form layouts. Some highly custom forms may require retries.'
    },
    {
      question: 'Will websites detect that I\'m using a bot?',
      answer: 'InboxHunter includes stealth features like realistic browser fingerprinting, human-like typing delays, and anti-detection measures. While no solution is 100% undetectable, our approach closely mimics real user behavior.'
    },
    {
      question: 'How do I handle CAPTCHAs?',
      answer: 'You can add your 2Captcha API key in Settings for automatic CAPTCHA solving. Without it, the browser will pause when a CAPTCHA appears, allowing you to solve it manually.'
    },
    {
      question: 'Is my data stored securely?',
      answer: 'Yes, all data stays on your computer in a local SQLite database. We never collect, transmit, or have access to your credentials, API keys, or any scraped data. Your privacy is fully protected.'
    },
  ]

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.button 
            variants={fadeIn}
            onClick={() => setCurrentPage('home')} 
            className={`flex items-center gap-2 mb-10 group transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
          
          <motion.div variants={fadeIn} className="mb-10">
            <h1 className={`text-4xl font-bold mb-4 ${textPrimary}`}>Frequently Asked Questions</h1>
            <p className={`text-xl ${textSecondary}`}>Common questions about InboxHunter</p>
        </motion.div>

          <motion.div variants={fadeIn} className="space-y-3">
          {faqs.map((faq, i) => (
              <div 
              key={i}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  openIndex === i 
                    ? isDark ? 'border-blue-500/30 bg-blue-500/5' : 'border-blue-300 bg-blue-50'
                    : isDark ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-white'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`w-full px-6 py-5 text-left flex items-center justify-between transition-colors ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}
                >
                  <span className={`font-semibold pr-4 ${textPrimary}`}>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform shrink-0 ${openIndex === i ? 'rotate-180 text-blue-500' : textSecondary}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                  >
                      <div className={`px-6 pb-5 leading-relaxed ${textSecondary}`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
          ))}
        </motion.div>

          <motion.div variants={fadeIn} className={`mt-12 p-6 rounded-2xl border text-center ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
            <h3 className={`font-semibold mb-2 ${textPrimary}`}>Still have questions?</h3>
            <p className={`mb-4 ${textSecondary}`}>We're happy to help with any other questions you might have.</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-medium hover:opacity-90 transition-opacity text-white"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </a>
        </motion.div>
        </motion.div>
      </div>
            </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or default to dark
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev
      localStorage.setItem('theme', newValue ? 'dark' : 'light')
      return newValue
    })
  }

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-[#08080c] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <HomePage key="home" setCurrentPage={setCurrentPage} isDark={isDark} />}
        {currentPage === 'how-it-works' && <HowItWorksPage key="how-it-works" setCurrentPage={setCurrentPage} isDark={isDark} />}
        {currentPage === 'getting-started' && <GettingStartedPage key="getting-started" setCurrentPage={setCurrentPage} isDark={isDark} />}
        {currentPage === 'faq' && <FAQPage key="faq" setCurrentPage={setCurrentPage} isDark={isDark} />}
      </AnimatePresence>
    </div>
  )
}

export default App
