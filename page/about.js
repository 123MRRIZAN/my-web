
import React from "react";
import { Card } from "@/components/ui/card";
import { Scan, MessageSquare, Zap, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    {
      icon: Scan,
      title: "Face Recognition",
      description: "Advanced AI-powered facial recognition technology that can register and identify faces with high accuracy. Store personal details and retrieve them instantly.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageSquare,
      title: "Real-Time Chat",
      description: "Connect with other users instantly through our live chat system. Simple, fast, and secure communication platform for everyone.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const technologies = [
    { name: "AI-Powered Recognition", icon: Sparkles },
    { name: "Real-Time Updates", icon: Zap },
    { name: "Secure & Private", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              About AI Vision Suite
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A comprehensive AI-powered platform that combines face recognition and real-time communication in one seamless experience.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <Card className="bg-[#13131A] border-[#1F1F28] p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                We aim to make advanced AI technology accessible to everyone. Our platform demonstrates 
                the power of modern artificial intelligence in recognition, identification, and communication, 
                providing users with cutting-edge tools that were once only available to large corporations.
              </p>
            </Card>
          </motion.div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-[#13131A] border-[#1F1F28] p-8 h-full hover:border-purple-500/50 transition-all duration-300">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Powered By</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <Card key={tech.name} className="bg-[#13131A] border-[#1F1F28] p-8 text-center hover:border-purple-500/50 transition-all duration-300">
                  <tech.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-bold">{tech.name}</h3>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 p-12">
              <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Choose Feature</h3>
                  <p className="text-gray-400">
                    Select from face recognition or live chat
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Get Results</h3>
                  <p className="text-gray-400">
                    Receive instant, accurate AI-powered results
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mt-16 text-gray-500"
          >
            <p className="text-sm">
              Built with cutting-edge AI technology • Privacy-focused • Always improving
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
