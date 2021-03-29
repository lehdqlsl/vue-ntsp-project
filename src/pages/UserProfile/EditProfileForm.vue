<template>
    <b-card no-body>
      <b-tabs content-class="mt-3" card>
        <b-tab title="요약" active lazy>
          <test1></test1>
        </b-tab>
        <b-tab title="활동" lazy>
          <test2></test2>
        </b-tab>
        <b-tab title="장비" lazy>
          <test4></test4>
        </b-tab>
      </b-tabs>
    </b-card>
</template>
<script>
  import test1 from 'src/components/user/test1'
  import test2 from 'src/components/user/test2'
  import test4 from 'src/components/user/test4'
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card,
      test1,
      test2,
      test4
    },
    data () {
      return {
        user: {
          company: 'Light dashboard',
          username: 'michael23',
          email: '',
          firstName: 'Mike',
          lastName: 'Andrew',
          address: 'Melbourne, Australia',
          city: 'melbourne',
          country: 'Australia',
          postalCode: '',
          aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
        }
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
