/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
    },
    fontSize: {
      xs: ["calc(0.75rem * var(--spacer))", "calc(16px * var(--spacer))"],
      sm: ["calc(0.875rem * var(--spacer))", "calc(20px * var(--spacer))"],
      base: ["calc(1rem * var(--spacer))", "calc(26px * var(--spacer))"],
      md: ["calc(1.075rem * var(--spacer))", "calc(28px * var(--spacer))"],
      lg: ["calc(1.125rem * var(--spacer))", "calc(28px * var(--spacer))"],
      xl: ["calc(1.25rem * var(--spacer))", "calc(30px * var(--spacer))"],
      "2xl": ["calc(1.5rem * var(--spacer))", "calc(30px * var(--spacer))"],
      "3xl": ["calc(1.875rem * var(--spacer))", "calc(38px * var(--spacer))"],
      "4xl": ["calc(2.25rem * var(--spacer))", "calc(46px * var(--spacer))"],
      "5xl": ["calc(3rem * var(--spacer))", "calc(60px * var(--spacer))"],
      "6xl": ["calc(4.375rem * var(--spacer))", "calc(80px * var(--spacer))"],
    },
    borderRadius: {
      none: "0",
      sm: "var(--border-radius-sm)",
      DEFAULT: "var(--border-radius)",
      md: "var(--border-radius-md)",
      lg: "var(--border-radius-md)",
      xl: "var(--border-radius-xl)",
      "2xl": "var(--border-radius-2xl)",
      "3xl": "var(--border-radius-3xl)",
      full: "var(--border-radius-full)",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "var(--container-padding)",
        sm: "var(--container-padding)",
        xl: "var(--container-padding)",
      },
    },
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "var(--white)",
        black: "var(--black)",
        "color-1": "var(--color-1)",
        gradient: "var(--gradient)",
      },
      boxShadow: {
        sm: "0px 10px 30px 0px #0000000D",
        md: "0px 0px 10px 5px #00000008",
        lg: "0px 0px 87.30000305175781px 2.700000047683716px #0000000F",
        xl: "0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)",
      },
    },
    spacing: {
      px: "1px",
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      13: "52px",
      14: "56px",
      15: "60px",
      16: "64px",
      17: "68px",
      18: "72px",
      19: "76px",
      20: "80px",
      21: "84px",
      22: "88px",
      23: "92px",
      24: "96px",
      25: "100px",
      26: "104px",
      27: "108px",
      28: "112px",
      29: "116px",
      30: "120px",
      31: "124px",
      32: "128px",
      33: "132px",
      34: "136px",
      35: "140px",
      36: "144px",
      37: "148px",
      38: "152px",
      39: "156px",
      40: "160px",
      41: "164px",
      42: "168px",
      43: "172px",
      44: "176px",
      45: "180px",
      46: "184px",
      47: "188px",
      48: "192px",
      49: "196px",
      50: "200px",
      51: "204px",
      52: "208px",
      53: "212px",
      54: "216px",
      55: "220px",
      56: "224px",
      57: "228px",
      58: "232px",
      59: "236px",
      60: "240px",
      61: "244px",
      62: "248px",
      63: "252px",
      64: "256px",
      65: "260px",
      66: "264px",
      67: "268px",
      68: "272px",
      69: "276px",
      70: "280px",
      71: "284px",
      72: "288px",
      73: "292px",
      74: "296px",
      75: "300px",
      76: "304px",
      77: "308px",
      78: "312px",
      79: "316px",
      80: "320px",
      81: "324px",
      82: "328px",
      83: "332px",
      84: "336px",
      85: "340px",
      86: "344px",
      87: "348px",
      88: "352px",
      89: "356px",
      90: "360px",
      91: "364px",
      92: "368px",
      93: "372px",
      94: "376px",
      95: "380px",
      96: "384px",
      97: "388px",
      98: "392px",
      99: "396px",
      100: "400px",
      101: "404px",
      102: "408px",
      103: "412px",
      104: "416px",
      105: "420px",
      106: "424px",
      107: "428px",
      108: "432px",
      109: "436px",
      110: "440px",
      111: "444px",
      112: "448px",
      113: "452px",
      114: "456px",
      115: "460px",
      116: "464px",
      117: "468px",
      118: "472px",
      119: "476px",
      120: "480px",
      121: "484px",
      122: "488px",
      123: "492px",
      0.5: "2px",
      1.5: "6px",
      2.5: "10px",
      3.5: "14px",
      4.5: "18px",
      5.5: "22px",
      6.5: "26px",
      7.5: "30px",
      8.5: "34px",
      9.5: "38px",
      10.5: "42px",
      11.5: "46px",
      12.5: "50px",
      13.5: "54px",
      14.5: "58px",
      15.5: "62px",
      16.5: "66px",
      17.5: "70px",
      18.5: "74px",
      19.5: "78px",
      20.5: "82px",
      21.5: "86px",
      22.5: "90px",
      23.5: "94px",
      24.5: "98px",
      25.5: "102px",
      26.5: "106px",
      27.5: "110px",
      28.5: "114px",
      29.5: "118px",
      30.5: "122px",
      31.5: "126px",
      32.5: "130px",
      33.5: "134px",
      34.5: "138px",
      35.5: "142px",
      36.5: "146px",
      37.5: "150px",
      38.5: "154px",
      39.5: "158px",
      40.5: "162px",
      41.5: "166px",
      42.5: "170px",
      43.5: "174px",
      44.5: "178px",
      45.5: "182px",
      46.5: "186px",
      47.5: "190px",
      48.5: "194px",
      49.5: "198px",
      50.5: "202px",
      51.5: "206px",
      52.5: "210px",
      53.5: "214px",
      54.5: "218px",
      55.5: "222px",
      56.5: "226px",
      57.5: "230px",
      58.5: "234px",
      59.5: "238px",
      60.5: "242px",
      61.5: "246px",
      62.5: "250px",
      63.5: "254px",
      64.5: "258px",
      65.5: "262px",
      66.5: "266px",
      67.5: "270px",
      68.5: "274px",
      69.5: "278px",
      70.5: "282px",
      71.5: "286px",
      72.5: "290px",
      73.5: "294px",
      74.5: "298px",
      75.5: "302px",
      76.5: "306px",
      77.5: "310px",
      78.5: "314px",
      79.5: "318px",
      80.5: "322px",
      81.5: "326px",
      82.5: "330px",
      83.5: "334px",
      84.5: "338px",
      85.5: "342px",
      86.5: "346px",
      87.5: "350px",
      88.5: "354px",
      89.5: "358px",
      90.5: "362px",
      91.5: "366px",
      92.5: "370px",
      93.5: "374px",
      94.5: "378px",
      95.5: "382px",
      96.5: "386px",
      97.5: "390px",
      98.5: "394px",
      99.5: "398px",
      100.5: "402px",
      101.5: "406px",
      102.5: "410px",
      103.5: "414px",
      104.5: "418px",
      105.5: "422px",
      106.5: "426px",
      107.5: "430px",
      108.5: "434px",
      109.5: "438px",
      110.5: "442px",
      111.5: "446px",
      112.5: "450px",
      113.5: "454px",
      114.5: "458px",
      115.5: "462px",
      116.5: "466px",
      117.5: "470px",
      118.5: "474px",
      119.5: "478px",
      120.5: "482px",
      121.5: "486px",
      122.5: "490px",
      123.5: "494px",
    },
  },
  plugins: [],
};