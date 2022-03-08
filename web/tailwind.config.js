module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      'xxxs': ['10px'],
      'xxs': ['13px'],
    },
    fontFamily: {
      sans: ['Sulphur Point', 'sans-serif'],
      title: ['Reem Kufi', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      black: {
        DEFAULT: '#0A0B18'
      },
      grey: {
        DEFAULT: '#5F5F5F',
        light: '#7D828A',
        dark: {
          DEFAULT: '#23242D',
          light: '#2C2C34'
        }
      },
      white: {
        DEFAULT: 'white',
        transparent: '#FFFFFF47'
      },
      blue: {
        DEFAULT : '#234580',
        light: '#57B3FF',
        green: '#3EFACB',
        dark: '#132544'
      },
      red: '#D80E0E',
      yellow: '#FFE922'
    },
    extend: {
      height: {
        '1/10': '10%',
        '9/10': '90%',
        '1000': '1000px'
      },
      width: {
        '28%': '28%'
      },
      shadow: {
        menu: '20px 0px 30px #CFDCE6',
      },
    },
    listStyleType: {
      circle: 'circle'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};