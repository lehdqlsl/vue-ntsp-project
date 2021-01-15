<template>
  <div class="content">
    <div class="container-fluid">
        <div class="row">
          <div class="col-xl-6">
            <card>
              <h4 class="card-title" style="margin-bottom: 10px;">장애 세부 내용</h4>
              <div class="row">
                <b-table-simple hover small responsive style="text-align: left;">
                  <b-tr>
                    <b-th class="pl-3 pt-3" style="width: 200px;"><p>게이트웨이 번호</p></b-th>
                    <b-td class="pl-3 pt-3"><p>010-6123-2525</p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>장애 번호</p></b-th>
                    <b-td class="pl-3 pt-3"><p>18391</p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>종류</p></b-th>
                    <b-td class="pl-3 pt-3"><p>데이터 미수신</p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>발생시각</p></b-th>
                    <b-td class="pl-3 pt-3"><p><a href="#">2020/09/16 17:20:95</a></p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>상태</p></b-th>
                    <b-td class="pl-3 pt-3"><p>해결됨</p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>처리자</p></b-th>
                    <b-td class="pl-3 pt-3"><p>Admin(이동빈)</p></b-td>
                  </b-tr>
                </b-table-simple>
              </div>


            </card>
          </div>


          <div class="col-xl-6 d-flex">
            <card class="flex-fill">
              <h5 class="card-title mb-3">처리 이력</h5>
              <l-table class="table-hover table-sm"
                       :columns="table2.columns"
                       :data="table2.data">
              </l-table>
            </card>
          </div>
          <div class="col-xl-6">
          </div>
          <div class="col-xl-6">
            <card>
              <h5 class="card-title mb-3">최근 발생 장애 목록</h5>
              <l-table class="table-hover table-sm"
                       :columns="table1.columns"
                       :data="table1.data">
              </l-table>
            </card>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'

  const tableColumns = ['장애', '발생시각', '처리시각', '처리자', '인지', '상태']
  const tableData = [{
    이벤트: '미수신',
    발생시각: '2020-08-14 09:05',
    처리시각: '2020-08-14 10:15',
    처리자: 'Admin(이동빈)',
    인지: "예",
    상태: "해결됨"
  },
    {
      이벤트: '미수신',
      발생시각: '2020-08-15 09:05',
      처리시각: '2020-08-15 09:12',
      처리자: 'Admin(이동빈)',
      인지: "예",
      상태: "해결됨"
    }
  ]

  const tableColumns2 = ['장애번호','시각', '처리자', '내용', '처리']
  const tableData2 = [
    {
      장애번호: '2764',
      시각: '2020-08-21 10:05',
      처리자: 'Admin(이동빈)',
      내용: '전원이 빠져있었음<br> 전원 연결 후 재개통',
      처리: "처리"
    },
    {
      장애번호: '2764',
      시각: '2020-08-14 09:05',
      처리자: 'Admin(이동빈)',
      내용: '데이터 미수신<br> 방문 점검예정',
      처리: "미처리"
    }
  ]
  export default {
    components: {
      LTable
    },
    data() {
      return {
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        table2: {
          columns: [...tableColumns2],
          data: [...tableData2]
        },
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
  .row p{
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
    color: #6c757d;
    font-size: 14px;
  }
</style>
