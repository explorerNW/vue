<script lang="ts">
  import { $moment } from '../utils';

  import List from './List.vue';
  import Error from './Error.vue';

  import ComponentA from '../components/Componant-a.vue';
  import ComponentB from '../components/Component-b.vue';
  import ComponentC from '../components/Component-c.vue';
  import SlotComponent from '../components/SlotComponent.vue';

  import CustomInput from '../components/CustomInput.vue';
  import Diretive from '../components/Directive.vue';

  import { defineAsyncComponent } from 'vue';

  import { countStore, store } from '../stores/counter';

  interface IUser {
    firstName: string;
    lastName: string;
  }

  interface IList {
    id: string;
    name: string;
    label: string;
  }

  export default {
    inject: ['i18n'],
    // async setup() {
    //   const res = await fetch('http://localhost:6173/question');
    //   await res.json().then();
    // },
    data() {
      return {
        firstName: 'test-first',
        lastName: 'test-last',
        now: $moment(Date.now()).format('MM/DD/YYYY HH:mm:ss'),
        question: '',
        answer: '',
        timer: 0,
        interval: 0,
        count: 0,
        user: {
          firstName: 'user-test-first',
          lastName: 'user-test-last',
        },
        step: 0,
        list: Array(10).fill(true).map((item, index)=>{
          return {
            id: `id-${index}`,
            name: `name-${index}`,
            label: `label-${index}`
          }
        }),
        label: '',
        componentActiveIndex: 0,
        modelValue: '',
        components: ['ComponentA', 'ComponentB', 'ComponentC'],
        countStore,
        store,
        translate: this.i18n
      }
    },
    inheritAttrs: false,
    components: {
      List,
      Error,
      ComponentA,
      ComponentB,
      ComponentC,
      SlotComponent,
      CustomInput,
      AsyncComponent: defineAsyncComponent({
        loader: () => import('../components/AsyncComponent.vue'),
        loadingComponent: ComponentA,
        errorComponent: Error,
        delay: 10000
      }),
      Diretive
    },
    created: function() {
      console.log(`created-${this.step++}`);
      console.log(this.i18n);
    },
    mounted: function() {
      console.log(`mounted-${this.step++}`);
      console.log(this.$refs);
      this.interval = setInterval(()=>{
        this.now = $moment(Date.now()).format('MM/DD/YYYY HH:mm:ss');
        this.user.lastName = `${this.user.lastName.slice(0 ,this.user.lastName.toString().indexOf('-'))}-${this.timer++}`;
      }, 1000);
    },
    unmounted: function() {
      console.log(`unmounted-${this.step++}`);
      clearInterval(this.interval);
    },
    computed: {
      date: () => {
        return new Date();
      },
      now_format: () => {
        return $moment().format('DD/MM/YYY hh:mm:ss');
      },
      fullName: {
        // getter
        get() {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set(newValue: string) {
          // Note: we are using destructuring assignment syntax here.
          [this.firstName, this.lastName] = newValue.split(' ')
        }
      }
    },
    watch: {
      question(newValue: string, oldValue: string) {
        if (this.answer === 'Waiting' || newValue.lastIndexOf('?') !== newValue.length - 1) {
          return;
        }
        if (!newValue) {
          this.answer = '';

          return;
        }
        if (newValue.includes('?')) {
          this.answer_func();
        }
      },
      user: {
        handler(newValue: IUser, oldValue: IUser) {
          console.log('user-newValue: ', newValue.lastName);
        },
        deep: false
      }
    },
    methods: {
      now_func(){
        return $moment(Date.now()).format('MM/DD/YYYY HH:mm:ss:SSS');
      },
      alert() {
        alert(1);
      },
      sendHandler(event: Event, item: IList) {
        this.label = item.label;
        this.componentActiveIndex++;
        if (this.componentActiveIndex > this.components.length - 1) {
          this.componentActiveIndex = 0;
        }

        this.label = this.components[this.componentActiveIndex];
      },
      async answer_func() {
        this.answer = 'Waiting...';
        const res = await fetch('http://localhost:6173/question');
        this.answer = await res.json().then(({ answer })=> answer);
      },
      changeValue(e: Event) {
        console.log(e);
      },
      log(e: Event) {
        console.log(e);
      }
    },
    errorCaptured(e) {
      debugger;
      console.log('error-captue-->', e);
      return true;
    }
  }
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{ fullName }}</h1>
    <h2>{{ date }}</h2>
    <h2>{{ 'user: ' + `${user.firstName} ${user.lastName}`  }}</h2>
    <h2>{{ 'date.now in methods: ' + now_func() }}</h2>
    <h2>{{ 'date.now in computed: ' + now }}</h2>
    <h2 @click="alert">{{ now_format }}</h2>
    count: <h2 v-on:click="count++">{{ count }}</h2>
    <input v-model="question">
    <input v-model.number="count">{{ count }}
    <span v-on:click="alert">{{ answer }}</span>
    <input ref="input"/>
    <button ref="button">button-ref</button>

    <List :list = "list" @send="sendHandler"></List>

    <Error>something error</Error>
    
    <KeepAlive>
      <component :is="label" :name="label"></component>
    </KeepAlive>
    
    <Component-a @click="changeValue" :step="step"></Component-a>
    <div>
      @emit: <CustomInput :model-value="modelValue" @update:model-value="(e)=>{ modelValue = e; }"></CustomInput>
    </div>
    <div>
      v-model: <CustomInput v-model="modelValue"></CustomInput>
    </div>
    modelValue: {{ modelValue }}

    <span>AsyncComponent: </span>
    <Suspense>
      <AsyncComponent/>
      <template #fallback>loading...</template>
    </Suspense>

    <span>countStore: </span><span>{{ countStore.count }}</span>

    <span>vuex-store: </span><span>{{ store.state.count }}</span>

    <Diretive></Diretive>

    {{ (translate as any).greetings.hello }}
    <!-- {{ $translate('greetings.hello') }} -->

    <SlotComponent v-slot="sloatProps">
      <span >slot:header->{{ sloatProps.title }}{{ log(sloatProps) }}</span>
      <component :is="sloatProps.componentName"></component>
    </SlotComponent>
    <SlotComponent>
      <template #content>content in slot</template>
    </SlotComponent>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
