import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Bot,
  Zap,
  Shield,
  Download,
  Apple,
  Monitor,
  ChevronDown,
  ChevronRight,
  Terminal,
  Settings,
  Play,
  CheckCircle2,
  ExternalLink,
  Github,
  MessageCircle,
  FileText,
  Sparkles,
  Target,
  Clock,
  BarChart3,
  Eye,
  Database,
  Cpu,
  Globe,
  Menu,
  X
} from 'lucide-react'
import './App.css'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

// Components
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#download', label: 'Download' },
    { href: '#getting-started', label: 'Getting Started' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">InboxHunter</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[hsl(var(--muted-foreground))] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Download Now
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[hsl(var(--muted-foreground))]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-[hsl(var(--border))]"
            >
              <div className="flex flex-col gap-4 pt-4">
                {links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[hsl(var(--muted-foreground))] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#download"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium text-center"
                >
                  Download Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grid-bg noise-overlay">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Powered by GPT-4 Vision</span>
            </div>
          </motion.div>
          
          {/* Heading */}
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold leading-tight">
            AI-Powered
            <br />
            <span className="gradient-text">Lead Generation</span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            Automatically sign up for competitor email lists using intelligent AI form filling. 
            Research competitor strategies effortlessly.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#download"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              <Download className="w-5 h-5" />
              Download Free
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[hsl(var(--border))] text-white font-semibold text-lg hover:bg-[hsl(var(--card))] transition-colors"
            >
              See How It Works
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
          
          {/* Stats */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-12 pt-12">
            {[
              { value: '100%', label: 'Form Success Rate' },
              { value: '<2min', label: 'Per Signup' },
              { value: 'GPT-4o', label: 'Vision AI' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[hsl(var(--border))] glow-blue">
            <div className="bg-[hsl(var(--card))] p-1">
              {/* Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(var(--border))]">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-4 text-sm text-[hsl(var(--muted-foreground))]">InboxHunter</span>
              </div>
              
              {/* Mock App Content */}
              <div className="p-6 bg-[hsl(var(--background))]">
                <div className="flex gap-6">
                  {/* Sidebar */}
                  <div className="w-48 space-y-2">
                    {['Dashboard', 'Settings', 'Logs'].map((item, i) => (
                      <div key={i} className={`px-4 py-2 rounded-lg text-sm ${i === 0 ? 'bg-blue-500/20 text-blue-400' : 'text-[hsl(var(--muted-foreground))]'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Dashboard</h3>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Running
                      </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Processed', value: '47', color: 'blue' },
                        { label: 'Successful', value: '45', color: 'emerald' },
                        { label: 'Success Rate', value: '96%', color: 'purple' },
                      ].map((stat, i) => (
                        <div key={i} className={`p-4 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                          <div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Activity */}
                    <div className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                      <div className="text-sm font-medium mb-3">Recent Activity</div>
                      {['✅ Signed up: marketing-pro.com', '✅ Signed up: leadgen-experts.io', '🔄 Processing: funnel-masters.com'].map((log, i) => (
                        <div key={i} className="text-sm text-[hsl(var(--muted-foreground))] py-1">{log}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Form Filling',
      description: 'GPT-4 Vision analyzes any web form and intelligently fills it out - handles complex multi-step forms, checkboxes, dropdowns, and more.',
      color: 'blue'
    },
    {
      icon: Eye,
      title: 'Visual Understanding',
      description: 'Uses computer vision to see forms exactly as humans do. No brittle selectors or manual configuration needed.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Stealth Mode',
      description: 'Built-in anti-detection features bypass bot protection. Realistic browser fingerprinting and human-like behavior.',
      color: 'emerald'
    },
    {
      icon: Globe,
      title: 'Meta Ads Scraper',
      description: 'Automatically scrapes landing pages from Facebook/Instagram ads. Target competitor ads by keyword.',
      color: 'pink'
    },
    {
      icon: Database,
      title: 'Local Database',
      description: 'All data stays on your machine. Track signups, avoid duplicates, and export your research.',
      color: 'amber'
    },
    {
      icon: Cpu,
      title: 'Smart Rate Limiting',
      description: 'Intelligent delays and retry logic. Handles API limits and CAPTCHAs automatically.',
      color: 'cyan'
    },
  ]

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Everything you need for automated lead generation, built with cutting-edge AI technology.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-blue-500/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[hsl(var(--muted-foreground))]">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Configure Credentials',
      description: 'Set up your signup credentials - email, name, and phone. These will be used to fill out forms.',
      icon: Settings
    },
    {
      step: '02',
      title: 'Choose Data Source',
      description: 'Scrape URLs from Meta Ads Library using keywords, or load your own list from a CSV file.',
      icon: Target
    },
    {
      step: '03',
      title: 'Start Automation',
      description: 'Hit start and watch the AI navigate to each page, analyze forms, and complete signups automatically.',
      icon: Play
    },
    {
      step: '04',
      title: 'Review Results',
      description: 'Track your progress in real-time. View logs, stats, and export your collected data.',
      icon: BarChart3
    },
  ]

  return (
    <section id="how-it-works" className="py-32 relative bg-[hsl(var(--card))]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative text-center"
              >
                {/* Connector Line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-blue-500 to-purple-500 opacity-30" />
                )}
                
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-sm font-medium text-blue-400 mb-2">Step {step.step}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-[hsl(var(--muted-foreground))]">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function DownloadSection() {
  const platforms = [
    {
      name: 'macOS',
      icon: Apple,
      version: 'v1.0.0',
      size: '85 MB',
      file: 'InboxHunter-1.0.0-macos.dmg',
      available: true
    },
    {
      name: 'Windows',
      icon: Monitor,
      version: 'v1.0.0',
      size: '92 MB',
      file: 'InboxHunter-1.0.0-windows.exe',
      available: true
    },
    {
      name: 'Linux',
      icon: Terminal,
      version: 'v1.0.0',
      size: '78 MB',
      file: 'InboxHunter-1.0.0-linux.AppImage',
      available: true
    },
  ]

  return (
    <section id="download" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Download</span> InboxHunter
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Available for all major platforms. Free and open source.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {platforms.map((platform, i) => {
            const Icon = platform.icon
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative p-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-blue-500/50 transition-all hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
                  <div className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                    {platform.version} • {platform.size}
                  </div>
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                      platform.available
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                        : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] cursor-not-allowed'
                    }`}
                    disabled={!platform.available}
                  >
                    {platform.available ? (
                      <span className="flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </span>
                    ) : (
                      'Coming Soon'
                    )}
        </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-[hsl(var(--muted-foreground))]"
        >
          <p>Requires: Python 3.9+, Node.js 18+, 4GB RAM minimum</p>
          <p className="mt-2">
            <a href="#" className="text-blue-400 hover:underline inline-flex items-center gap-1">
              View on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function GettingStartedSection() {
  const [activeStep, setActiveStep] = useState(0)
  
  const guides = [
    {
      title: 'Installation',
      content: [
        { type: 'text', value: '1. Download the app for your operating system from the download section above.' },
        { type: 'text', value: '2. Install the application:' },
        { type: 'code', label: 'macOS', value: 'Open the .dmg file and drag InboxHunter to Applications' },
        { type: 'code', label: 'Windows', value: 'Run the .exe installer and follow the prompts' },
        { type: 'code', label: 'Linux', value: 'chmod +x InboxHunter.AppImage && ./InboxHunter.AppImage' },
        { type: 'text', value: '3. On first launch, the app will set up its Python environment automatically.' },
      ]
    },
    {
      title: 'Configuration',
      content: [
        { type: 'text', value: '1. Go to Settings → Credentials and enter your signup details:' },
        { type: 'list', value: ['First Name & Last Name', 'Email address (use a catch-all or alias)', 'Phone number with country code'] },
        { type: 'text', value: '2. Go to Settings → API Keys:' },
        { type: 'code', label: 'OpenAI API Key', value: 'Get from platform.openai.com/api-keys' },
        { type: 'text', value: '3. Choose your LLM model (GPT-4o recommended for best results).' },
      ]
    },
    {
      title: 'Data Sources',
      content: [
        { type: 'text', value: 'Choose how to find landing pages:' },
        { type: 'heading', value: 'Meta Ads Library (Recommended)' },
        { type: 'list', value: ['Enter keywords like "marketing, funnel, coaching"', 'Set max ads to scrape', 'The bot will find competitor ads automatically'] },
        { type: 'heading', value: 'CSV File' },
        { type: 'list', value: ['Create a CSV with a "url" column', 'Each row should contain a landing page URL', 'Select the file in Settings → Data Source'] },
      ]
    },
    {
      title: 'Running the Bot',
      content: [
        { type: 'text', value: '1. Click "Start Bot" in the header to begin automation.' },
        { type: 'text', value: '2. Watch the Dashboard for real-time progress.' },
        { type: 'text', value: '3. View detailed logs in the Logs tab.' },
        { type: 'text', value: '4. The bot will:' },
        { type: 'list', value: ['Navigate to each landing page', 'Analyze the form using AI vision', 'Fill out fields intelligently', 'Handle checkboxes, dropdowns, and CAPTCHAs', 'Submit and verify success'] },
        { type: 'text', value: '5. Click "Stop" anytime to pause automation.' },
      ]
    },
  ]

  return (
    <section id="getting-started" className="py-32 relative bg-[hsl(var(--card))]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Getting <span className="gradient-text">Started</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Follow these guides to set up and run InboxHunter.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Steps Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {guides.map((guide, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    activeStep === i
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white'
                      : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                      activeStep === i ? 'bg-blue-500 text-white' : 'bg-[hsl(var(--muted))]'
                    }`}>
                      {i + 1}
                    </div>
                    <span className="font-medium">{guide.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
              >
                <h3 className="text-2xl font-bold mb-6">{guides[activeStep].title}</h3>
                <div className="space-y-4">
                  {guides[activeStep].content.map((item, i) => {
                    if (item.type === 'text') {
                      return <p key={i} className="text-[hsl(var(--muted-foreground))]">{item.value}</p>
                    }
                    if (item.type === 'heading') {
                      return <h4 key={i} className="text-lg font-semibold mt-6 text-blue-400">{item.value}</h4>
                    }
                    if (item.type === 'code') {
                      return (
                        <div key={i} className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] font-mono text-sm">
                          {item.label && <div className="text-xs text-blue-400 mb-2">{item.label}</div>}
                          <code className="text-emerald-400">{item.value}</code>
                        </div>
                      )
                    }
                    if (item.type === 'list') {
                      return (
                        <ul key={i} className="space-y-2 ml-4">
                          {(item.value as string[]).map((li, j) => (
                            <li key={j} className="flex items-start gap-2 text-[hsl(var(--muted-foreground))]">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                              {li}
                            </li>
                          ))}
                        </ul>
                      )
                    }
                    return null
                  })}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-[hsl(var(--border))]">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeStep === 0
                        ? 'text-[hsl(var(--muted-foreground))] cursor-not-allowed'
                        : 'text-blue-400 hover:bg-blue-500/10'
                    }`}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(guides.length - 1, activeStep + 1))}
                    disabled={activeStep === guides.length - 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeStep === guides.length - 1
                        ? 'text-[hsl(var(--muted-foreground))] cursor-not-allowed'
                        : 'text-blue-400 hover:bg-blue-500/10'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Is InboxHunter free to use?',
      answer: 'Yes, InboxHunter is completely free and open source. However, you will need an OpenAI API key which has its own costs based on usage. The GPT-4o model typically costs about $0.01-0.05 per form filled.'
    },
    {
      question: 'What is the success rate for form filling?',
      answer: 'InboxHunter achieves a 90-100% success rate on standard opt-in forms. The AI can handle most form layouts including multi-step forms, hidden checkboxes, and complex validation. Some highly custom or JavaScript-heavy forms may require retries.'
    },
    {
      question: 'Will websites detect that I\'m using a bot?',
      answer: 'InboxHunter includes stealth features like realistic browser fingerprinting, human-like typing delays, and anti-detection scripts. While no solution is 100% undetectable, our approach mimics real user behavior very closely.'
    },
    {
      question: 'Can I use this for commercial purposes?',
      answer: 'Yes, InboxHunter is licensed under MIT. You can use it for personal research, competitor analysis, or commercial lead generation. Always ensure you comply with applicable laws and website terms of service.'
    },
    {
      question: 'How do I handle CAPTCHAs?',
      answer: 'InboxHunter supports integration with 2Captcha for automatic CAPTCHA solving. Add your 2Captcha API key in Settings. Without this, you may need to solve CAPTCHAs manually when they appear (the browser will pause).'
    },
    {
      question: 'What if the Meta Ads scraper doesn\'t work?',
      answer: 'Meta occasionally requires login or shows cookie dialogs. Try running without headless mode first. You can also use the CSV import option to load your own list of landing page URLs.'
    },
    {
      question: 'Is my data stored securely?',
      answer: 'All data is stored locally in a SQLite database on your computer. We never collect or transmit your credentials, API keys, or scraped data. Your privacy is fully protected.'
    },
    {
      question: 'How can I contribute to the project?',
      answer: 'InboxHunter is open source! Check out our GitHub repository to report bugs, suggest features, or submit pull requests. We welcome contributions from the community.'
    },
  ]

  return (
    <section id="faq" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-[hsl(var(--muted-foreground))]">
            Got questions? We've got answers.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="border border-[hsl(var(--border))] rounded-2xl overflow-hidden bg-[hsl(var(--card))]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[hsl(var(--muted-foreground))] transition-transform ${
                  openIndex === i ? 'rotate-180' : ''
                }`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-[hsl(var(--muted-foreground))]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SupportSection() {
  const supportOptions = [
    {
      icon: Github,
      title: 'GitHub Issues',
      description: 'Report bugs or request features',
      link: '#',
      linkText: 'Open Issue'
    },
    {
      icon: MessageCircle,
      title: 'Discord Community',
      description: 'Get help from the community',
      link: '#',
      linkText: 'Join Discord'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Read the full documentation',
      link: '#',
      linkText: 'View Docs'
    },
  ]

  return (
    <section id="support" className="py-32 relative bg-[hsl(var(--card))]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Need <span className="gradient-text">Help?</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            We're here to support you. Choose the best option for your needs.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {supportOptions.map((option, i) => {
            const Icon = option.icon
            return (
              <motion.a
                key={i}
                href={option.link}
                variants={fadeInUp}
                className="group p-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:border-blue-500/50 transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">{option.description}</p>
                <span className="inline-flex items-center gap-1 text-blue-400 font-medium">
                  {option.linkText} <ExternalLink className="w-4 h-4" />
                </span>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold">InboxHunter</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">AI Lead Generation</div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm text-[hsl(var(--muted-foreground))]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#download" className="hover:text-white transition-colors">Download</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>

          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            © 2024 InboxHunter. MIT License.
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DownloadSection />
      <GettingStartedSection />
      <FAQSection />
      <SupportSection />
      <Footer />
    </div>
  )
}

export default App
