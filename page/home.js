
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Scan, MessageSquare, ArrowRight, Sparkles, Camera, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      title: "Face Recognition",
      description: "Register your face with personal details and be recognized instantly on your next visit",
      icon: Scan,
      gradient: "from-purple-500 to-pink-500",
      link: createPageUrl("FaceRecognition"),
      stats: "AI-Powered Identification"
    },
    {
      title: "Live Chat Room",
      description: "Connect with other users in real-time. Join conversations happening right now",
      icon: MessageSquare,
      gradient: "from-green-500 to-emerald-500",
      link: createPageUrl("Chat"),
      stats: "Real-Time Messaging"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              AI Vision Suite
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Experience the future of recognition technology. Face detection, and real-time communication in one powerful platform.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl("FaceRecognition")}>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/60">
                  <Camera className="w-5 h-5 mr-2" />
                  Try Face Recognition
                </Button>
              </Link>
              <Link to={createPageUrl("Chat")}>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-[#1F1F28] px-8 py-6 text-lg rounded-xl transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" />
                  Join Live Chat
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 text-lg">Everything you need for AI-powered recognition and communication</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link to={feature.link}>
                <Card className="group relative overflow-hidden bg-[#13131A] border-[#1F1F28] hover:border-purple-500/50 transition-all duration-300 h-full p-8 cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent ${feature.gradient}`}>
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{feature.stats}</span>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-gray-400">Recognition Accuracy</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                <Camera className="w-12 h-12 mx-auto text-orange-400" />
              </div>
              <div className="text-gray-400">Real-Time Processing</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-400">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


