function Poster() {
  return (
    <view style={{width: 200,
        background: "#fff",
        height: 200,}}>
      <view
        style={{
          width: 200,
          background: "#fff",
          height:100,
          flexDirection: "row",
        }}
      >
        <view style={{ flex: 1, background: "#0000ff", height: 20 }}></view>
        <view style={{ flex: 1, background: "#f0f", height: 20 }}></view>
        <view style={{ flex: 1, background: "#000", height: 20 }}></view>
        <view style={{ flex: 1, background: "#ff0000", height: 20 }}></view>
      </view>
      <text>测试<em>1112</em></text>
    </view>
  );
}
