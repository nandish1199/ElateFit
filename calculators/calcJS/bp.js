
        $(document).ready(function() {
            $("#calcsubmit").click(function() {
                var idealBP = "";
                var age = $("#age").val();
                var gender = $("input:radio[name=gender]:checked").val();

                $("#disclaimer").css("display","block");
                if (gender == "male" || gender == "female") {
                    if (age > 0 && age <= 1) {
                        idealBP = "min[75/50], normal[90/60], max[110/75]";
                    } else if (age > 1 && age <= 5) {
                        idealBP = "min[80/55], normal[95/65], max[110/79]";
                    } else if (age > 5 && age <= 13) {
                        idealBP = "min[90/60], normal[105/70], max[115/80]";
                    } else if (age > 13 && age <= 19) {
                        idealBP = "min[105/73], normal[117/77], max[120/81]";
                    } else if (age > 19 && age <= 24) {
                        idealBP = "min[108/75], normal[120/79], max[132/83]";
                    } else if (age > 24 && age <= 29) {
                        idealBP = "min[109/76], normal[121/80], max[133/84]";
                    } else if (age > 29 && age <= 34) {
                        idealBP = "min[110/77], normal[122/81], max[134/85]";
                    } else if (age > 29 && age <= 34) {
                        idealBP = "min[110/77], normal[122/81], max[134/85]";
                    } else if (age > 34 && age <= 39) {
                        idealBP = "min[111/78], normal[123/82], max[135/86]";
                    } else if (age > 39 && age <= 44) {
                        idealBP = "min[112/79], normal[125/83], max[137/87]";
                    } else if (age > 44 && age <= 49) {
                        idealBP = "min[115/80], normal[127/84], max[139/88]";
                    } else if (age > 49 && age <= 54) {
                        idealBP = "min[116/81], normal[129/85], max[142/89]";
                    } else if (age > 54 && age <= 59) {
                        idealBP = "min[118/82], normal[131/86], max[144/90]";
                    } else if (age > 59 && age <= 64) {
                        idealBP = "min[121/83], normal[134/87], max[147/91]";
                    } else if (age > 64 && age <= 100) {
                        idealBP = "min[121/83], normal[134/87], max[147/91]";
                    }
                }
                $("#idlBPdisplay").html('<h3 style="margin:15px;"><b>Your Ideal Blood Pressure Should be:</b></h3> <h1 style="background: #39CCCC;padding:20px;">'+idealBP+'</h1>');
            });
        });