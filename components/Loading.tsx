import { motion, Variants } from "motion/react";
import * as S from "./Loading.styles";

export default function Loading(props: { message?: string }) {
  const { message } = props;
  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };
  return (
    <S.LoadingContainer>
      <motion.div
        animate="jump"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="container"
      >
        <motion.div className="dot" variants={dotVariants} />
        <motion.div className="dot" variants={dotVariants} />
        <motion.div className="dot" variants={dotVariants} />
      </motion.div>
      {message && <p>{message}</p>}
    </S.LoadingContainer>
  );
}
