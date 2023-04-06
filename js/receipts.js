// Phiếu thu
render();

var lstData = "";
$("input[type=file]").on('change',function(e){
    if (e.target.files[0]) {
        // localStorage
        localStorage.setItem("lstDataReport",  null);

        let file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        workbook.SheetNames.forEach(function(sheetName) 
        {
            //read sheet name = DANH_SACH
            if(sheetName == "DANH_SACH")
            {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                lstData = XL_row_object;
                localStorage.setItem("lstDataReport", json_object);
                render();            
            }        
        })};
        reader.readAsBinaryString(file);
    }    
});

$("#resetData").click(function(){
    localStorage.removeItem("lstDataReport");
    location.reload();
});

$("#printPage").click(function(){
    // window.print();
    printPage('index.html')
});

function render()
{
    let lstDataResult = localStorage.getItem("lstDataReport");
    if(lstDataResult != null)
    {
        var result = JSON.parse(lstDataResult);
        result.forEach(function(item){
            var title = result[0].No ?? "" ;
            //show body
            if(item.No > 0 && item.__EMPTY != undefined){
                let no = item.No ?? "";
                let name = item.__EMPTY ?? "";
                let moneyAmount = item.__EMPTY_1 ?? "";
                let truNH = item.__EMPTY_2 ?? "";
                let remain = item.__EMPTY_3 ?? "";
                let table = renderTable(no, title, name, moneyAmount, truNH, remain);

                $("#listTable").append(table);
            }
        });
    }
}

function renderTable(no, title, name, moneyAmount, truNH, remain)
{
    return `
        <div class="displayTable">                
            <table class="table table table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col" style="text-align: center; font-weight: bold">${no}</th>
                        <th scope="col">${title}</th>
                    </tr>
                </thead>
                <body>
                    <tr>
                        <td>Tên:</td>
                        <td class="fw-bold">${name}</td>
                    </tr>
                    <tr>
                        <td>Số tiền:</td>
                        <td>${moneyAmount}</td>
                    </tr>
                    <tr>
                        <td>Trừ NH:</td>
                        <td>${truNH}</td>
                    </tr>
                    <tr>
                        <td>Còn lại:</td>
                        <td>${remain}</td>
                    </tr>
                </body>
            </table>
        </div>
    `;
}



