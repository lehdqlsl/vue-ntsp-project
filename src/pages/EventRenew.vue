<template>
  <div class="content">
    <div class="container-fluid">
        <div class="row">
          <div class="col-xl-6">
            <card>
              <h4 class="card-title">이벤트 갱신</h4>
              <div>
                <div class="row mb-3">
                  <div class="col-lg-4" style="text-align: right">
                    <label>메시지</label>
                  </div>
                  <div class="col-lg-8">
                    <b-form-textarea
                      no-resize
                      rows="6"
                      style="width: 100%"></b-form-textarea>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-4" style="text-align: right">
                    <label>이력</label>
                  </div>
                  <div class="col-lg-8">
                    <b-table
                      :items="items"
                      :small="true"
                    :borderless="true" style="border: 1px solid #E3E3E3;margin-bottom: 0px;"></b-table>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-4" style="text-align: right">
                    <label>인지</label>
                  </div>
                  <div class="col-lg-8">
                    <b-form-checkbox></b-form-checkbox>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-4" style="text-align: right">
                    <label>처리 완료</label>
                  </div>
                  <div class="col-lg-8">
                    <b-form-checkbox></b-form-checkbox>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-4">
                  </div>
                  <div class="col-lg-8">
                    <b-button squared variant="primary" class="mr-3" size="sm">갱신</b-button>
                    <b-button squared variant="light" size="sm">취소</b-button>
                  </div>
                </div>
              </div>
            </card>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fields: ['시각', '유저', '메시지'],
        items: [
          { 시각: '2020/09/17 11:35:00', 유저: 'Admin', 메시지: '전화하였으나 받지않음' },
          { 시각: '2020/09/17 11:35:00', 유저: 'Admin', 메시지: '테스트' },
          { 시각: '2020/09/17 11:35:00', 유저: 'Admin', 메시지: '테스트' }
        ]
      }
    }
  }
</script>
<style>
  label{
    font-size: 0.9rem !important;
  }
</style>
