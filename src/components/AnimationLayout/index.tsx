import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "tween",
      }}
    >
      <Outlet />
    </motion.div>
  );
};

export default AnimationLayout;
