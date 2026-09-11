
        $(document).ready(function() {
            $("#calcsubmit").click(function(event) {
                event.preventDefault();

                var height = $("#height").val();
                var weight = $("#weight").val();
                var age = $("#age").val();
                var gender = $("input:radio[name=gender]:checked").val();
                var missingFields = [];

                if (!height || Number(height) <= 0) {
                    missingFields.push("Height in centimeters");
                }
                if (!weight || Number(weight) <= 0) {
                    missingFields.push("Weight in kilograms");
                }
                if (!age || Number(age) <= 0) {
                    missingFields.push("Age");
                }
                if (!gender) {
                    missingFields.push("Gender");
                }

                if (missingFields.length) {
                    alert("Please enter or select the following fields:\n\n" + missingFields.map(function(field, index) {
                        return (index + 1) + ". " + field;
                    }).join("\n"));

                    if (missingFields[0] === "Height in centimeters") {
                        $("#height").trigger("focus");
                    } else if (missingFields[0] === "Weight in kilograms") {
                        $("#weight").trigger("focus");
                    } else if (missingFields[0] === "Age") {
                        $("#age").trigger("focus");
                    } else {
                        $("input:radio[name=gender]").first().trigger("focus");
                    }
                    return false;
                }

                $(".weightResult, .bmiDietPlannDisplay").css("display", "none");

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