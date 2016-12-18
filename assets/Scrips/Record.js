if(!cc.runtime){
cc.Class({
    extends: cc.Component,

    properties: {
        recorder:{
            default:null,
            type:cc.Node
        },
        tester:{
            default:null,
            type:cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        var session=new IFlyIatSession({
        "callback":{
            "onResult":function(err,result){
                if(err==null||err==undefined||err==0){
                    if(result==''||result==null)
                        this.tester.string="没有获取到识别结果";
                    else
                        this.tester.string=result.toString();
                }else{
                    this.tester.string=err.toString()+result.toString();
                }
            },
            "onVolume":function(volume){
                
            },
            "onError":function(){
                
            },
            "onProcess":function(status){
                switch(status){
                    case 'onStart':
                        this.tester.string="服务初始化";
                        break;
                    case 'normalVolume':
                    case 'started':
                        this.tester.string="倾听中";
                        break;
                    case 'onStop':
                        this.tester.string="等待结果";
                        break;
                    case 'onEnd':
                        this.tester.string=oldText;
                        break;
                    case 'lowVolume':
                        this.tester.string="倾听中(声音过小)";
                        break;
                    default:
                        this.tester.string=status;
                }
            }
        }
        });

        if(this.recorder){
            this.recorder.on(cc.Node.EventType.TOUCH_START,event=>{
                this._record();
            },this);
        }
    },
    
    _record:function(){
        var ssb_param={
            "grammar_list": null,
            "params": "appid=583a97de,appidkey=5417118c65059796, lang = sms, acous = anhui, aue=speex-wb;-1, usr = mkchen, ssm = 1, sub = iat, net_type = wifi, rse = utf8, ent =sms16k, rst = plain, auf  = audio/L16;rate=16000, vad_enable = 1, vad_timeout = 5000, vad_speech_tail = 500, compress = igzip"
        };
        
        //this.tester.string="按下";
        //this.tester.string=ssb_param.toString();
        session.start(ssb_param);
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
}