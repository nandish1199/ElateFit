
        $(document).ready(function() {
            $("#calcsubmit").click(function() {
                var height = $("#height").val();
                var weight = $("#weight").val();
                var age = $("#age").val();
                var gender = $("input:radio[name=gender]:checked").val();

                $("#disclaimer").css("display","block");
                var heightinMeter = height/100;
                var bmi= (weight/(heightinMeter * heightinMeter));

                if (age == 20  || age > 20) {
                    if(bmi < 16){
                        $("#severeThinness").css("display","block");
                        $("#bimwgDietPlanDisplay").css("display","block");
                    }
                    if(bmi > 16 && (bmi == 16 || bmi < 17)){
                        $("#moderateThinness").css("display","block");
                        $("#bimwgDietPlanDisplay").css("display","block");
                    }
                    if(bmi > 17 && (bmi == 17 || bmi < 18.5)){
                        $("#mildThinness").css("display","block");
                        $("#bimwgDietPlanDisplay").css("display","block");
                    }
                    if(bmi > 18.5 && (bmi == 18.5 || bmi < 25)){
                        $("#normal").css("display","block");
                    }
                    if(bmi > 25 && (bmi == 25 || bmi < 30)){
                        $("#overweight").css("display","block");
                        $("#bimwlDietPlanDisplay").css("display","block");
                    }
                    if(bmi > 30 && (bmi == 30 || bmi < 35)){
                        $("#mildObesity").css("display","block");
                        $("#bimwlDietPlanDisplay").css("display","block");
                    }
                    if(bmi > 35 && (bmi == 35 || bmi < 40)){
                        $("#obesity").css("display","block");
                        $("#bimwlDietPlanDisplay").css("display","block");
                    }
                    if(bmi > 40){
                        $("#severeObesity").css("display","block");
                        $("#bimwlDietPlanDisplay").css("display","block");
                    }  
                }
            });
        });