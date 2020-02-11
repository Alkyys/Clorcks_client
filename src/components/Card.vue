<template>
  <div class="card">
    <ul>
      <li v-for="color in colors" :key="color._id">
        <div
          class="colorcard"
          :style="{'background': `rgba(${color.red},${color.green},${color.blue},${color.alpha})`}"
        ></div>
        <div class="iconcard">
          <img @click="option = !option" src="../assets/logo/settings.svg" alt />
          <img src="../assets/logo/heart.svg" alt />
        </div>
      </li>
    </ul>
    <div v-if="option" class="modal"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colors: [
        {
          likeCount: 0,
          _id: '5db98f327b9e619908fbcfb5',
          red: 45,
          blue: 97,
          green: 53,
          alpha: 100,
          createdAt: '2019-10-30T13:25:06.317Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f52bb7b80b99433d70f',
          red: 192,
          blue: 126,
          green: 92,
          alpha: 100,
          createdAt: '2019-10-30T13:25:38.027Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f60bb7b80b99433d710',
          alpha: 1,
          blue: 111,
          green: 130,
          red: 243,
          createdAt: '2019-10-30T13:25:52.376Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 255,
          green: 185,
          blue: 97,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 132,
          green: 250,
          blue: 176,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 143,
          green: 211,
          blue: 244,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 7,
          green: 36,
          blue: 72,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 84,
          green: 210,
          blue: 210,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 255,
          green: 203,
          blue: 0,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 248,
          green: 170,
          blue: 75,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 255,
          green: 97,
          blue: 80,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 247,
          green: 164,
          blue: 0,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 58,
          green: 158,
          blue: 253,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 62,
          green: 68,
          blue: 145,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 41,
          green: 42,
          blue: 115,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 26,
          green: 27,
          blue: 75,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 69,
          green: 77,
          blue: 102,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b80b99433d711',
          red: 48,
          green: 153,
          blue: 117,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        },
        {
          likeCount: 0,
          _id: '5db98f71bb7b8q0b99433d711',
          red: 88,
          green: 179,
          blue: 104,
          alpha: 1,
          createdAt: '2019-10-30T13:26:09.573Z',
          __v: 0
        }
      ],
      option: false
    }
  },
  name: 'Card',
  props: {
    // colors: [Object]
  }
}
</script>

<style scoped lang="scss">
.card {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem 0px;
    li {
      margin: 1em;
      width: 6rem;
      height: 8rem;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 1px 1px 10px #0000000f;
      border-radius: 5px;
      .colorcard {
        margin: 0.25rem auto 0px auto;
        height: 5.5em;
        width: 5.5em;
        background: var(--color-rgb) 0% 0% no-repeat padding-box;
        border-radius: 5px;
      }
      .iconcard {
        margin: 0.4rem 0.5rem;
        display: flex;
        justify-content: space-between;
        height: 1.5rem;
      }
    }
  }
  .modal {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(30px);
  }
}
</style>
