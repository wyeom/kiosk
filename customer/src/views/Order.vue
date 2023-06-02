<template>

<div>
  <CToaster placement="top-start" >
    <template v-for="(toast, index) in toasts">
      <CToast :color=toast.color class="text-white align-items-center" visible>
      <CToastHeader closeButton>
      <span class="me-auto fw-bold">{{toast.title}}</span>
      <small>1 min ago</small>
      </CToastHeader>
      <CToastBody>
          {{ toast.message }}
      </CToastBody>  
      </CToast>
    </template>
</CToaster>
</div>

<div class="grid grid-cols-12 gap-0 bg-gray-100" style="font-family:'yg-jalnan';">
<div class="col-span-7 rounded-md ml-5" >
  <div class="py-6 px-4">
    <h1 class="text-3xl font-bold  text-red-400">Menus</h1>
  </div>
    <div class="mx-auto max-w-2xl py-5 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" >
          <a href="#" class="group" v-for="e in products" @click="clickProduct(e)">
              <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <img :src=e.img class="h-32 object-cover object-center group-hover:opacity-75">
              </div>
              <h3 class="mt-4 text-lg text-gray-700">{{e.name}}</h3>
              <p class="mt-1 text-lg font-medium text-gray-900">${{e.price}}</p>
          </a>
        </div>
        <br>
        {{tableNo}}
    </div>

</div>


<div class="col-span-4">
  <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
    <div class="pointer-events-auto w-screen max-w-md">
      <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div class="flex gap-2 py-4 px-4 w-full border-b">
          <input type="text" autocomplete="email" required class="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="테이블 번호"
          v-model="id">
          <input type="password" autocomplete="password" required class="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="password"
          v-model="password">
          <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          @click="connect">connect</a>
        </div>
        <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">주문내역</h2>
            <div class="ml-3 flex h-7 items-center">
              <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Close panel</span>
                <!-- Heroicon name: outline/x-mark -->
              </button>
            </div>
          </div>

          <div class="mt-8">
            <div class="flow-root">
              <ul role="list" class="-my-6 divide-y divide-gray-200">
                
                <li class="flex py-6" v-for="item in orderList">
                  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img :src="item.img" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center">
                  </div>
                  <div class="ml-4 flex flex-1 flex-col">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href="#">{{item.name}}</a>
                        </h3>
                        <p class="ml-4">${{item.price}}</p>
                      </div>
                      <p class="mt-1 text-sm text-gray-500" 
                        :class="[statCd[item.status]=='조리완료'?'bg-blue-300 rounded-lg':'bg-yellow-100 rounded-lg']">
                        {{statCd[item.status]}}
                      </p>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                      <p class="text-gray-500">Qty 1</p>

                      <div class="flex">
                        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500"
                        @click="removeItem(item)"
                        >Remove</button>
                      </div>
                    </div>
                  </div>
                </li>


              </ul>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${{total}}</p>
          </div>
          <div class="mt-6">
            <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" @click="disconnect">Checkout</a>
          </div>
          <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</div>

</template>
<style scoped>
  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
</style>
<!-- <style lang="css" scoped src="@coreui/coreui/dist/css/coreui.min.css"></style> -->

<script>
  import { CButton ,CToast,CToaster, CToastHeader ,CToastBody} from '@coreui/vue';
  import '@coreui/coreui/dist/css/coreui.min.css'
  // import 'bootstrap/dist/css/bootstrap.min.css'

  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { getCurrentInstance,defineComponent,ref,computed,watch,onMounted } from "vue";
  
  //Scoket
  import {io} from 'socket.io-client'
  import item from '../modules/items'
  import moment from 'moment'
  import _ from 'lodash'

  
  

  const produts = [
    item ('참치'  ,5   ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4FaaEHo9eCY4vm2_b97Xm3EBYlsZD4IjJw&usqp=CAU'),
    item ('연어'  ,2.5 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXoqZ36QSdN6gmHbF63bKl5GI9KJbqEOwcUQ&usqp=CAU'),
    item ('군함'  ,3.5 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIc1-o7Bfx8WWhKF_A856CtEL9a9XxePz1Xg&usqp=CAU'),
    item ('한치'  ,3   ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4GLsNzGsZPgg1mef6KK18utdwI0iyGotRA&usqp=CAU'),
    item ('유부'  ,2   ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv6nIBX-Di5m_NXXFY6oocUfek5OUAoNpU6w&usqp=CAU'),
    item ('광어'  ,4.5 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ5xnlRzVVTUNWuwtc4DXFakDLA84wnc9XIg&usqp=CAU'),
    item ('새우'  ,2.5 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DdbRNWtbCq507x3Rq3Z7min1CgmcUqFZsg&usqp=CAU'),
    item ('참치(특)'  ,15   ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4FaaEHo9eCY4vm2_b97Xm3EBYlsZD4IjJw&usqp=CAU'),
    item ('연어(특)'  ,12.5 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXoqZ36QSdN6gmHbF63bKl5GI9KJbqEOwcUQ&usqp=CAU'),
    item ('군함(특)'  ,13.5 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIc1-o7Bfx8WWhKF_A856CtEL9a9XxePz1Xg&usqp=CAU'),
    item ('한치(특)'  ,13   ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4GLsNzGsZPgg1mef6KK18utdwI0iyGotRA&usqp=CAU'),
    item ('유부(특)'  ,12   ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv6nIBX-Di5m_NXXFY6oocUfek5OUAoNpU6w&usqp=CAU'),
    item ('광어(특)'  ,14.5 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ5xnlRzVVTUNWuwtc4DXFakDLA84wnc9XIg&usqp=CAU'),
    item ('새우(특)'  ,12.5 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DdbRNWtbCq507x3Rq3Z7min1CgmcUqFZsg&usqp=CAU')
  ]
  
  export default defineComponent({
    
    components : {
      CButton ,CToast,CToaster, CToastHeader ,CToastBody
    },

    setup(props, context) {

      const router = useRouter();
      const store = useStore();
      const counter = computed(() => store.state.counter);
      const title = computed(() => store.state.title);
      const userId = computed(() => store.state.id);
      const tableNo = computed(() => store.state.tableNo);
      const products = ref(produts);
      const orderList = ref();
      const total = ref(0);
      const id = ref('')
      const statCd = ref(['주문가능','주문','조리완료']);
      const toasts = ref([]);

      let socket;

    const connect = ()=>{
        console.log(id.value);
        socket =  io('http://localhost:14519',{
            extraHeaders: {
                userid: id.value
            }});
        socket.on('connection-back',(msg) => {
            console.log(">>> connection",socket.id)
            popToast({message:'Connected'})
            store.commit('SET_TABLE_NO', id.value+"/"+socket.id);
        });
        socket.on('order-back', (message) => {
            orderList.value = message
            hookOrders();
            console.log('>>> order-back',message);
        });
        socket.on('order-cancel-back', (message) => {
            orderList.value = message
            hookOrders();
            console.log('>>> order-cancel-back',message);
        });
        socket.on('done-back', (message) => {
            let trans = message.trans;
            let index = _.findIndex(orderList.value,(o)=> o.trans == trans )
            orderList.value[index] = message;
            console.log('>>> Server Message.',message);
        });
        socket.on('chef-message', (message) => {
            console.log(message)
            let trans = message.trans;
            let index = _.findIndex(orderList.value,(o)=> o.trans == trans )
            // orderList.value[index] = message;
            popToast({title:'From Chef',message:message,color:'primary'})
        });
        socket.on('disconnect', (count) => {
            console.log('>>> disconnect',socket.id);
            store.commit('SET_TABLE_NO', "");
            popToast({message:'disConnected',color:'warning'})
        });
        
      }

      const  popToast = (data)=>{
          data.title??='System Message'
          data.color??='success'
          toasts.value.push(data)
        }

      const disconnect = ()=>{
        socket.disconnect(userId.value);
      }

      const clickProduct = (item) => {
        
        if(!socket) {
          console.log("📜 : clickProduct : socket", socket)
          popToast({message:'새 Profile의  연결이 필요합니다.',color:'danger'})
          return;
        }
        let now = moment(new Date()).format("YYYYMMDDHHmmss");
        let rand = Math.random().toString(36).substring(2, 6);
        item.trans = now + "-"+rand
        item.status = 1;
        socket.emit('order',item)
      }

      const removeItem = (item) => {
        console.log(item)
        socket.emit('order-cancel',item)
      }

      const hookOrders = ()=>{
        total.value = 0;
        orderList.value.forEach(e=>{
          total.value +=Number(e.price)
        })
      }
      
      onMounted(() => {
        //connect();
      });
      
      return {
        title,
        counter,
        id: userId,
        disconnect,
        connect,
        products,
        clickProduct,
        orderList,
        total,
        id,
        tableNo,
        statCd,
        removeItem,
        popToast,
        toasts
      }
    }
    
},);


</script>
<style>
    @font-face {
            font-family: 'yg-jalnan';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }
</style>