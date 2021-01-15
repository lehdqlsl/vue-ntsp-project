<template>
  <card class="card-user">
    <img slot="image" src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>
    <div class="author">
        <img class="avatar border-gray" src="img/faces/face-10.jpg" alt="..."/>
        <h4 class="title" style="font-weight: bold;margin-top: 0px;">이동빈<br />
        </h4>
    </div>
    <div class="" style="padding-left: 5px;padding-right: 5px;">
      <div class="row" style="margin-bottom: 5px;">
        <small class="col-sm-3">주소:</small><small class="col-sm-9">{{selectedRow.address1}}</small>
        <small class="col-sm-3"></small><small class="col-sm-9">{{selectedRow.address2}}</small>
      </div>
      <div class="row" style="margin-bottom: 5px;">
        <small class="col-sm-3">전화번호:</small><a href="#"><small class="col-sm-9">{{selectedRow.mobile}}</small></a>
      </div>
      <div class="row" style="margin-bottom: 5px;">
        <small class="col-sm-3">생년월일:</small><small class="col-sm-9">{{selectedRow.birth}}</small>
      </div>
      <div class="row">
        <small class="col-sm-3">성별:</small><small class="col-sm-9">남자</small>
      </div>
    </div>

    <div slot="footer" class="text-center justify-content-center">
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="success">정상</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="success">외출</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="info" style="background-color: #ffed00;color: #000000">미감지 (주의)</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="warning">미감지 (경고)</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >미감지 (위험)</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >화재발생</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >응급호출</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >센서불량</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >게이트웨이불량</b-badge></h4>
    </div>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      Card
    },
    props: {
      selectedRow: {
        type: Object,
        default: ""
      }
    },
    data () {
      return {
        details: [
          {
            title: '12',
            subTitle: 'Files'
          },
          {
            title: '2GB',
            subTitle: 'Used'
          },
          {
            title: '24,6$',
            subTitle: 'Spent'
          }
        ]
      }
    },
    methods: {
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      }
    }
  }

</script>
<style>
small{
  font-weight: bold;
}
</style>
