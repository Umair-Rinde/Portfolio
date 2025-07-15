module.exports = {
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-in': 'slide-in 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        glow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(29, 191, 189, 0.3)',
          },
          '50%': {
            opacity: '0.5',
            boxShadow: '0 0 30px rgba(29, 191, 189, 0.5)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
};
