function Poster({ height }) {
  return (
    <div
      style={{
        width: 328,
        padding: 20,
        background:
          "url(https://cloudcache.tencentcs.cn/qcloud/ui/cloud-community/build/Article/images/bg_78e.png)",
      }}
    >
      <div
        style={{
          width: 118,
          height: height,
          background:
            "url(https://cloudcache.tencentcs.cn/qcloud/ui/cloud-community/build/Article/images/head-logo_572.svg)",
        }}
      ></div>
      <div
        style={{
          marginTop: 22,
          lineClamp: 2,
          color: "#3c4369",
          fontSize: 16,
          fontWeight: "normal",
        }}
      >
        深入浅出Redis（八）：Redis的集群模式
      </div>
      <div
        style={{
          marginTop: 22,
          padding: 16,
          borderRadius: 4,
          background: 'linear-gradient(180deg,hsla(0,0%,100%,.56),rgba(231,239,251,.35))',
          boxShadow: "8px 8px 18px rgba(126,154,200,0.2)",
          border: "1px solid #fff",
        }}
      >
        <div
          style={{
            height: 50,
            flexDirection: "row",
            gap: "0 20",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              padding: 2,
              antialias: "default",
              background: "linear-gradient(1turn,#4087ef,#afd3ff)",
            }}
          >
            <div
              style={{
                height: 46,
                borderRadius: 23,
                antialias: "default",
                background:
                  'url("https://developer.qcloudimg.com/http-save/10011/763211c6416b8e3b1e2081fd288a44fc.jpg")',
              }}
            ></div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 22, fontSize: 12 }}>
              菜菜的后端私房菜
            </div>
            
          </div>
        </div>
        <div
          style={{
            height: 240,
            marginTop: 20,
            fontSize: 12,
            lineClamp: 12,
            color: "#4b5b76",
            lineHeight: 20,
          }}
        >
          深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据库深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据库深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据库深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据库深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据库深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据库深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据库深入浅出Redis（八）：Redis的集群模式Redis是一款优秀的键值对、内存非关系型数据库库
        </div>
        <div
          style={{
            marginTop: 14,
            paddingTop: 14,
            flexDirection: "row",
            gap: "0 20",
            alignItems: "center",
            borderTop: "1px solid #fff",
          }}
        >
          <div
            style={{
              height: 90,
              width: 90,
              padding: 4,
              borderRadius: 8,
              background: "rgba(237,243,251,0.6)",
              boxShadow: "4px 4px 18px rgba(73,114,183,0.3)",
              antialias: "none",
            }}
          >
            <div
              style={{
                background:
                  "url(https://qcloudimg.tencent-cloud.cn/raw/dad61ae6b851b4580d23ffcc4823aef5.png)",
                height: 82,
                width: 82,
              }}
            ></div>
          </div>
          <div style={{ height: 50, flex: 1 }}>
            <div
              style={{ lineHeight: 20, fontSize: 12, color: "#4b5b76" }}
            >
              长按二维码阅读全文
            </div>
            <div
              style={{
                lineHeight: 20,
                fontSize: 12,
                color: "#4b5b76",
                marginTop: 10,
              }}
            >
              文章来自腾讯云开发者社区
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
