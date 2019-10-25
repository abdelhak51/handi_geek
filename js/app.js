let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = SpeechRecognition? new SpeechRecognition() : false

Vue.component('speech-to-text', {
  template: `
    <v-card>
    <v-card-text>
      <v-layout row wrap justify-space-around>
        <v-flex xs8 sm9 text-xs-center>
          <p v-if="error" class="grey--text">{{error}}</p>
          <p v-else class="mb-0">
            <span v-if="sentences.length > 0" v-for="sentence in sentences">{{sentence}}. </span>
            <span>{{runtimeTranscription}}</span>
          </p>
        </v-flex>
        <v-flex xs2 sm1 text-xs-center>
          <v-btn
            dark
            @click.stop="toggle ? endSpeechRecognition() : startSpeechRecognition()"
            icon
            :color="!toggle ? 'grey' : (speaking ? 'red' : 'red darken-3')"
            :class="{'animated infinite pulse': toggle}"
          >
            <v-icon>{{toggle ? 'mic_off' : 'mic'}}</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
  `,
  props: {
    lang: {
      type: String,
      default: 'en-US'
    },
    text: {
      type: [String, null],
      required: true
    },
    
  },
  data () {
    return {
      error: false,
      speaking: true,
      toggle:false,
      text2:'',
      runtimeTranscription: [],
      sentences: [],
      docHtml:['<!DOCTYPE html>','<html>','<head>','<title>Page Title</title>','</head>','<body>','</body>','</html>'],

    }
  },
  methods: {
    checkCompatibility () {
      if (!recognition) {
        this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
      }
    },
    endSpeechRecognition () {
      recognition.stop()
      this.toggle = false
      this.$emit('speechend', {
        sentences: this.sentences,
        text: this.sentences.join('. ')
      })
    },
    startSpeechRecognition () {
      if (!recognition) {
        this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
        return false
      }
      this.toggle = true
      recognition.lang = this.lang
      recognition.interimResults = true
      //recognition.continuous = true;


      recognition.addEventListener('speechstart', event => {
      
        this.speaking = true
      })

      recognition.addEventListener('speechend', event => {

        this.speaking = false
      })

      recognition.addEventListener('result', event => {
        
        let text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
        if (text=='document') {
        	 //text='<!DOCTYPE html>\n<head>\n<metacharset="utf-8">\n\t<title></title>\n</head>\n<body>\n\n</body>\n</html>'
        	 text='<!DOCTYPE html>'
        	 text+="\r";
        	 text+="<head>"
        	 text+="\r"
        	 text+="<meta charset='utf-8'>"
        	 text+="\r"
        	 text+="<title></title>"
        	 text+="\r"
        	 text+="</head>"
        	 text+="\r"
        	 text+="</body>"
        	 text+="\r"
        	 text+="</html>"
        }


        if (text=='navigation') {
        	 //text='<!DOCTYPE html>\n<head>\n<metacharset="utf-8">\n\t<title></title>\n</head>\n<body>\n\n</body>\n</html>'
        	 //document.getElementById('test').value = " " ;
        	 text='<!DOCTYPE html>'
        	 text+="\r"
        	 text+="<head>"
        	 text+="<title>"
        	 text+="handi_geek"
        	 text+="</title>"
        	 text+="\r"
        	 text+="<meta charset='utf-8'>"
        	 text+="\r"
        	 text+="//bootstrap's and other necessary css links"
        	 text+="\r"
             text+='<style>........<style>'
             text+="\r"
             text+='<style>........<style>'
             text+="\r"
        	 text+="</head>"
        	 text+="\r"
        	 text+="<body>"
        	 text+="\r"
        	 text+="//bootstrap navabar"
        	 text+="\r"
        	 text+='<nav class="navbar navbar-expand-lg navbar-light bg-light">'
        	 text+="......"
           text+="\r"
           text+="......" 
           text+="\r"
             text+="</nav>"
             text+="\r"
             text+="//bootstrap's and other necessary js scripts"
             text+="\r"
             text+='<script>........<script>'
             text+="\r"
             text+='<script>........<script>'
             text+="\r"
             text+="</body>"
             text+="\r"
             text+="</html>"
             text+="\r"

        	//window.open("try.html","_blank")
        	/*window.setTimeout(function() {
        		window.location.href="file:///E:/diversityinclution/try.html"
            $('.resultdiv').html(text3)
        	},11000)*/

          var text3 ='<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="background-color:#222d32 !important;color:aliceblue;margin-left:-10px"><div class="row"><div class="col-md-6 fs-20">Navbar</div><div class="col-md-6"><div class="row display_flex_end"><a href="#" class="btn  text-light m-r-10">login</a><a href="#" class="btn text-light m-r-10 ">signup</a></div></div></div></nav>'

     window.setTimeout(function() {
            $('.resultdiv').html(text3)
          },5000)

window.setTimeout(function() {
            document.location.reload();
          },15000)


        	
        
        	
        }
      

         //picture
         if(text=='picture'){
            text='<!DOCTYPE html>'
           text+="\r"
           text+="<head>"
           text+="<title>"
           text+="handi_geek"
           text+="</title>"
           text+="\r"
           text+="<meta charset='utf-8'>"
           text+="\r"
           text+="//bootstrap's and other necessary css links"
           text+="\r"
             text+='<style>........<style>'
             text+="\r"
             text+='<style>........<style>'
             text+="\r"
           text+="</head>"
           text+="\r"
           text+="<body>"
           text+="\r"
           text+="//bootstrap navabar"
           text+="\r"
           text+='<nav class="navbar  navbar-light bg-light">'
           text+="\r"
             text+='......'
             text+="\r"
             text+='......'
             text+="\r"

             text+="</nav>"
             text+="\r"
             text+='<div class="picture">'
             text+="\r"
             text+=".........."
             text+="\r"
             text+="</div>"
             text+="\r"
           text+="//bootstrap's and other necessary js scripts"
             text+="\r"
             text+='<script>........<script>'
             text+="\r"
             text+='<script>........<script>'
             text+="\r"
             text+="</body>"
             text+="\r"
             text+="</html>"
             text+="\r"

          var text4 ='<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="background-color:#222d32 !important;color:aliceblue;margin-left:-10px"><div class="row"><div class="col-md-6 fs-20">Navbar</div><div class="col-md-6"><div class="row display_flex_end"><a href="#" class="btn  text-light m-r-10">login</a><a href="#" class="btn text-light m-r-10 ">signup</a></div></div></div></nav>'
          var text5='<table class="table"><thead><tr><th>id</th><th>name</th><th>job</th></tr></thead><tbody><tr><td>1</td><td>ahmed  </td><td>web dev</td></tr><tr><td>2</td><td>ali</td><td>grafic designer</td></tr></tbody></table>'
       
          var text6='<div style="position:relative"><div class="display_flex_center" style="position:absolute;top:45%;left:25%;"><h4 style="font-size:35px;font-weight:bold;position:relative;z-index:99">welcome to our website</h4></div><img src="images/simg.jpg" style="width:100%; height:300px; opacity:.6; margin-left:-5px" ></div>'
          window.setTimeout(function() {
            $('.resultdiv').html(text4)
            $('.resultdiv').append(text6)
          },5000)

      window.setTimeout(function() {
            document.location.reload();
          },15000)
           
            
         }


         if(text == 'Foundation'){

          text='<!DOCTYPE html>'
           text+="\r"
           text+="<head>"
           text+="<title>"
           text+="handi_geek"
           text+="</title>"
           text+="\r"
           text+="<meta charset='utf-8'>"
           text+="\r"
           text+="//bootstrap's and other necessary css links"
           text+="\r"
             text+='<style>........<style>'
             text+="\r"
             text+='<style>........<style>'
             text+="\r"
           text+="</head>"
           text+="\r"
           text+="<body>"
           text+="\r"
           text+="//bootstrap navabar"
           text+="\r"
           text+='<nav class="navbar navbar-light bg-light">'
           text+="\r"
             text+='.........'
             text+="\r"
             text+="</nav>"
             text+="\r"
             text+='<div class="picture">'
             text+="\r"
             text+=".........."
             text+="\r"
             text+="</div>"
             text+="\r"
             text+='<div class="Foundation">'
             text+="\r"
             text+=".........."
             text+="\r"
             text+="</div>"
             text+="\r"
           text+="//bootstrap's and other necessary js scripts"
             text+="\r"
             text+='<script>........<script>'
             text+="\r"
             text+='<script>........<script>'
             text+="\r"
             text+="</body>"
             text+="\r"
             text+="</html>"
             text+="\r"

            var text5 ='<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="background-color:#222d32 !important;color:aliceblue;margin-left:-10px"><div class="row"><div class="col-md-6 fs-20">Navbar</div><div class="col-md-6"><div class="row display_flex_end"><a href="#" class="btn  text-light m-r-10">login</a><a href="#" class="btn text-light m-r-10 ">signup</a></div></div></div></nav>'
          var text6='<div style="position:relative"><div class="display_flex_center" style="position:absolute;top:45%;left:25%;"><h4 style="font-size:35px;font-weight:bold;position:relative;z-index:99">welcome to our website</h4></div><img src="images/simg.jpg" style="width:100%; height:300px; opacity:.6; margin-left:-5px" ></div>'
            var text7 = "<div class='col-md-12'><div class='row'><h2>founder</h2></div><div class='row p-r-50'><div class='col-md-6 display_flex_end'><img src='images/simg.jpg' width='200' height='200' style='border-radius:50%;'></div><div class='col-md-6'><div class='row'><h3>Mr examle</h3></div><div class='row'><p>exampleexempleexemplexempleexample</p></div></div></div></div>"

             window.setTimeout(function() {
            $('.resultdiv').html(text5)
            $('.resultdiv').append(text6)
            $('.resultdiv').append(text7)
          },5000)
         }
        
         window.setTimeout(function() {
            document.location.reload();
          },15000)
        

        this.runtimeTranscription = text
        console.log('hhd')
      })

      recognition.addEventListener('end', () => {
        if (this.runtimeTranscription !== '') {

          this.sentences.push(this.runtimeTranscription)
          this.$emit('update:text', `${this.text}${this.sentences.slice(-1)[0]} `)
        }
        this.runtimeTranscription = ''
        recognition.stop()
        if (this.toggle) {
          // keep it going.
          recognition.start()
        }
      })
      recognition.start()
      
      //console.log(this.text)

    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  },
  mounted () {
    this.checkCompatibility()
     this.startSpeechRecognition()
  }
})

new Vue({
  el: '#app',
  vuetify:new Vuetify(),
  data () {
    return {
      text: '',
      sentences: null
    }
  },
  methods: {
    speechEnd ({sentences, text}) {
      console.log('text', text)
      console.log('sentences', sentences)
      this.sentences = sentences
    }
  }
})