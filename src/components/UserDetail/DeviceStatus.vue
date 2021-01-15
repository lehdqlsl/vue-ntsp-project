<template>
  <card>
    <b-list-group style="text-align: center">
      <b-list-group-item>
        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">게이트웨이</div>
        <i class="fa fa-plug fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        <i class="fa fa-signal fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
      </b-list-group-item>
      <b-list-group-item>
        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">활동감지기</div>
        <i class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        <i class="fa fa-wifi fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
      </b-list-group-item>
      <b-list-group-item>
        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">레이더센서</div>
        <i class="fa fa-plug fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        <i class="fa fa-wifi fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
      </b-list-group-item>
      <b-list-group-item>
        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">화재감지기</div>
        <i class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        <i class="fa fa-wifi fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
      </b-list-group-item>
      <b-list-group-item>
        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">열림감지기</div>
        <i class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        <i class="fa fa-wifi fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
      </b-list-group-item>
      <b-list-group-item>
        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">응급호출기</div>
        <i class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        <i class="fa fa-wifi fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
      </b-list-group-item>
    </b-list-group>
  </card>

  <!--<div class="row">
    <div class="col-xl-12 col-md-12 col-6 d-flex">
      <card class="flex-fill">
        <div class="text-center justify-content-center">
          <p>게이트웨이</p>
          <i class="fa fa-plug fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
          <i class="fa fa-signal fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        </div>
      </card>
    </div>
    <div class="col-xl-12 col-md-12 col-6 d-flex">
      <card class="flex-fill">
        <div class="text-center justify-content-center">
          <h5>활동</h5>
          <i class="fa fa-plug fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
          <i class="fa fa-signal fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        </div>
      </card>
    </div>
    <div class="col-xl-12 col-md-12 col-6 d-flex">
      <card class="flex-fill">
        화재
      </card>
    </div>
    <div class="col-xl-12 col-md-12 col-6 d-flex">
      <card class="flex-fill">
        응급
      </card>
    </div>
    <div class="col-xl-12 col-md-12 col-6 d-flex">
      <card class="flex-fill">
        열림
      </card>
    </div>
    <div class="col-xl-12 col-md-12 col-6 d-flex">
      <card class="flex-fill">
        레이더
      </card>
    </div>
  </div>-->
</template>

<script>
  export default {
    name: "DeviceStatus"
  }
</script>

<style scoped>
.fa {
  width: 38px;
}
.fa-2x {
  font-size: 1.5em;
}
.list-group-item {
  padding: 0.55rem 0 0.55rem 0;
}
</style>
