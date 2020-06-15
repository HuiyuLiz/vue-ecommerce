<template>
  <div class="tablists">
    <ul
      id="myTab"
      class="nav nav-tabs"
      role="tablist"
    >
      <li class="nav-item">
        <a
          id="home-tab"
          class="nav-link active text-secondary"
          data-toggle="tab"
          href="#home"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >介紹</a>
      </li>
      <li class="nav-item">
        <a
          id="profile-tab"
          class="nav-link text-secondary"
          data-toggle="tab"
          href="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >曲目</a>
      </li>
      <li class="nav-item">
        <a
          id="contact-tab"
          class="nav-link text-secondary"
          data-toggle="tab"
          href="#contact"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >購物說明</a>
      </li>
    </ul>
    <div
      id="myTabContent"
      class="tab-content"
    >
      <div
        id="home"
        class="tab-pane fade show active"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div class="my-3 p-3">
          <p
            v-if="product.content"
            class="card-text text-secondary text-justify h7"
          >
            {{ product.content }}
          </p>
        </div>
      </div>
      <div
        id="profile"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <table class="table mt-3">
          <thead>
            <tr class="text-secondary">
              <th
                scope="col"
                class="border-top-0"
              >
                #
              </th>
              <th
                scope="col"
                class="border-top-0"
              >
                曲目
              </th>
              <th
                scope="col"
                class="border-top-0 text-center"
              >
                <div class="d-none d-md-flex text-center">
                  藝人
                </div>
              </th>
              <th
                scope="col"
                class="border-top-0 text-center"
              >
                <i class="material-icons align-middle">access_time</i>
              </th>
            </tr>
          </thead>
          <tbody v-if="tracks">
            <tr
              v-for="(track,index) in tracks"
              :key="track.name"
              class="text-secondary"
            >
              <th
                scope="row"
                class="align-middle text-secondary"
              >
                <p class="mb-0">
                  {{ index+1 }}
                </p>
              </th>
              <td class="align-middle text-secondary">
                <p class="mb-0">
                  {{ track.name }}
                </p>
              </td>
              <td class="text-secondary text-center">
                <div class="d-none d-md-flex text-center text-secondary">
                  <p class="mb-0">
                    {{ singer }}
                  </p>
                </div>
              </td>
              <td class="align-middle text-center text-secondary">
                <p class="mb-0">
                  {{ track.duration |trackDuration }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        id="contact"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="contact-tab"
      >
        <div class="my-3 p-3">
          <p
            class="card-text text-secondary h7"
          >
            使用電腦播放程式請留意：CD曲目的編排是否正確，將視您所使用之播放程式其串連的媒體資料庫所提供的資訊而定。若播放程式所顯示的專輯資訊內容與實際商品有出入，此非商品本身問題，請您可手動更新程式或向程式管理人員反應。
          </p>
          <p class="card-text text-secondary h7">
            限量商品購買提醒：因數量有限，若庫存不足時，將無法提供換貨，敬請包涵見諒。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabList',
  props: {
    singer: {
      type: String,
      required: true
    },
    tracks: {
      type: Array,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    content () {
      let text = this.product.content
      return text.replace(/\r?\n/g, '<br/>')
    }
  }
}
</script>
