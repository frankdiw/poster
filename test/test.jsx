

function Poster() {
    function Card() {
        return <div style={{width: 100, height:100, background: "#00ffff"}}></div>
    }
    return <div style={{width: 200, height:200, background: "url('undefined')"}}>
        王抵押大渡口哈😄工大
        <Card></Card>
        {
            false && <Card></Card>
        }
        {null}
        {undefined}
        {1221}
    </div>
}