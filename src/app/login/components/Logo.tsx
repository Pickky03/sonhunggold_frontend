'use client'

import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center mb-6"
    >      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold text-[#ffca45] tracking-wider text-center"
      >
        SH
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl font-medium text-[#DAA520]/80 mt-2"
      >
        VÀNG BẠC SƠN HÙNG
      </motion.div>
    </motion.div>
  )
} 