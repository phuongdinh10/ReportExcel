
var lstData = "";
$("input[type=file]").on('change',function(e){
    if (e.target.files[0]) {
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        console.log(workbook.SheetNames);
        workbook.SheetNames.forEach(function(sheetName) 
        {
            //read sheet name = DANH_SACH
            if(sheetName == "DANH_SACH")
            {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                lstData = XL_row_object;

                if(lstData != null)
                {
                    lstData.forEach(function(item){
                        if(item.No == "STT ")
                        {
                            // show header
                            $("#headerTableCustom").append(`
                                <tr >
                                    <th scope="col">${item.No ?? ""}</th>
                                    <th scope="col">${item.__EMPTY ?? ""}</th>
                                    <th scope="col">${item.__EMPTY_1 ?? ""}</th>
                                    <th scope="col">${item.__EMPTY_2 ?? ""}</th>
                                    <th scope="col">${item.__EMPTY_3 ?? ""}</th>
                                </tr>
                            `);
                        }

                        //show body
                        if(item.No > 0 && item.__EMPTY != undefined){
                            $("#bodyTableCustom").append(`
                                <tr>
                                    <th scope="row">${item.No ?? ""}</th>
                                    <td>${item.__EMPTY}</td>
                                    <td>${item.__EMPTY_1 ?? ""}</td>
                                    <td>${item.__EMPTY_2 ?? ""}</td>
                                    <td>${item.__EMPTY_3 ?? ""}</td>
                                </tr>
                            `);
                        }
                    });
                }
            }        
        })};
        reader.readAsBinaryString(file);
    }    
});



