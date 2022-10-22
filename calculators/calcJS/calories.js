
        $(document).ready(function() {
            $("#calcsubmit").click(function() {
                var height = $("#height").val();
                var weight = $("#weight").val();
                var age = $("#age").val();
                var gender = $("input:radio[name=gender]:checked").val();
                var exercise = $("input:radio[name=exercise]:checked").val();

                $("#disclaimer").css("display","block");
                var heightinInch = height/2.54;
                var heightafter = heightinInch - 60;
                var idealWeight = 56.2 + (heightafter * 1.41);
                var fattyWeight = idealWeight + 10;
                var weakWeight = idealWeight - 10;

                var bmrCaloriesMale = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                var sedentaryCaloriesMale = bmrCaloriesMale + 300;
                var lowCaloriesMale = sedentaryCaloriesMale + 300;
                var mediumCaloriesMale = lowCaloriesMale + 200;
                var intenseCaloriesMale = mediumCaloriesMale + 200;

                var sedentaryCaloriesMaleLooseWeight = bmrCaloriesMale + 100;
                var lowCaloriesMaleLooseWeight = sedentaryCaloriesMale + 100;
                var mediumCaloriesMaleLooseWeight = lowCaloriesMale + 100;
                var intenseCaloriesMaleLooseWeight = mediumCaloriesMale + 100;

                var bmrCaloriesFemale = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                var sedentaryCaloriesFemale = bmrCaloriesFemale + 300;
                var lowCaloriesFemale = sedentaryCaloriesFemale + 300;
                var mediumCaloriesFemale = lowCaloriesFemale + 200;
                var intenseCaloriesFemale = mediumCaloriesFemale + 200;

                var sedentaryCaloriesFemaleLooseWeight = bmrCaloriesFemale + 100;
                var lowCaloriesFemaleLooseWeight = sedentaryCaloriesFemale + 100;
                var mediumCaloriesFemaleLooseWeight = lowCaloriesFemale + 100;
                var intenseCaloriesFemaleLooseWeight = mediumCaloriesFemale + 100;

                $("#idlWeightDisplay").html('<div><b>Your Ideal Weight Should be:</b> <h3 id="idlBPdisplay" style="background: #39CCCC;padding:20px;"> '+ idealWeight +' Kg </h3></div>');

                if(weight > fattyWeight ){
                    $("#dietPlanDisplay").html('<a class="btn btn-info" href="../dietPlans/wlDietPlansCat.html" >Diet Plans For You </a>');
                }
                if(weight < weakWeight ){
                    $("#dietPlanDisplay").html('<a class="btn btn-info" href="../dietPlans/wgDietPlansCat.html" >Diet Plans For You </a>');
                }

                if (gender == "male") {
                    if(exercise == "bmr"){
                        $("#bmrCalDisplayMale").html('<h3 class="p-2"><b>BMR</b></h3><table class="table table-striped"> <tr> <td> BMR </td> <td> '+ bmrCaloriesMale +' Calories </td> </tr> </table>');
                    }
                    if(exercise == "sedentary"){
                        $("#sedentaryCalDisplayMale").html('<h3 class="p-2"><b>Sedentary</b></h3><table class="table table-striped"> <tr> <td> Maintain Weight </td> <td> '+ sedentaryCaloriesMale +' Calories </td> </tr> <tr> <td> Loose Weight </td> <td> '+ sedentaryCaloriesMaleLooseWeight +' Calories </td> </tr> </table>');
                    }
                    if(exercise == "low"){
                        $("#lowCalDisplayMale").html('<h3 class="p-2"><b>Low Exercise</b></h3><table class="table table-striped"> <tr> <td> Maintain Weight </td> <td> '+ lowCaloriesMale +' Calories </td> </tr> <tr> <td> Loose Weight </td> <td> '+ lowCaloriesMaleLooseWeight +' Calories </td> </tr> </table>');
                    }
                    if(exercise == "medium"){
                        $("#mediumCalDisplayMale").html('<h3 class="p-2"><b>Medium Exercise</b></h3><table class="table table-striped"> <tr> <td> Maintain Weight </td> <td> '+ mediumCaloriesMale +' Calories </td> </tr> <tr> <td> Loose Weight </td> <td> '+ mediumCaloriesMaleLooseWeight +' Calories </td> </tr> </table>');
                    }
                    if(exercise == "intense"){
                        $("#intenseCalDisplayMale").html('<h3 class="p-2"><b>Intense Exercise</b></h3><table class="table table-striped"> <tr> <td> Maintain Weight </td> <td> '+ intenseCaloriesMale +' Calories </td> </tr> <tr> <td> Loose Weight </td> <td> '+ intenseCaloriesMaleLooseWeight +' Calories </td> </tr> </table>');
                    } 
                }

                if (gender == "female") {
                    if(exercise == "bmr"){
                        $("#bmrCalDisplayMale").html('<h3 class="p-2"><b>BMR</b></h3><table class="table table-striped"> <tr> <td> BMR </td> <td> '+ bmrCaloriesFemale +' </td> </tr> </table>');
                    }
                    if(exercise == "sedentary"){
                        $("#sedentaryCalDisplayFemale").html('<h3 class="p-2"><b>Sedentary</b></h3><table class="table table-striped"> <tr> <td> Maintain Weight </td> <td> '+ sedentaryCaloriesFemale +' Calories </td> </tr> <tr> <td> Loose Weight </td> <td> '+ sedentaryCaloriesFemaleLooseWeight +' Calories </td> </tr> </table>');
                    }
                    if(exercise == "low"){
                        $("#lowCalDisplayFemale").html('<h3 class="p-2"><b>Low Exercise</b></h3><table class="table table-striped"> <tr> <td> Maintain Weight </td> <td> '+ lowCaloriesFemale +' Calories </td> </tr> <tr> <td> Loose Weight </td> <td> '+ lowCaloriesFemaleLooseWeight +' Calories </td> </tr> </table>');
                    }
                    if(exercise == "medium"){
                        $("#mediumCalDisplayFemale").html('<h3 class="p-2"><b>Medium Exercise</b></h3><table class="table table-striped"> <tr> <td> Maintain Weight </td> <td> '+ mediumCaloriesFemale +' Calories </td> </tr> <tr> <td> Loose Weight </td> <td> '+ mediumCaloriesFemaleLooseWeight +' Calories </td> </tr> </table>');
                    }
                    if(exercise == "intense"){
                        $("#intenseCalDisplayFemale").html('<h3 class="p-2"><b>Intense Exercise</b></h3><table class="table table-striped"> <tr> <td> Maintain Weight </td> <td> '+ intenseCaloriesFemale +' Calories </td> </tr> <tr> <td> Loose Weight </td> <td> '+ intenseCaloriesFemaleLooseWeight +' Calories </td> </tr> </table>');
                    } 
                }
            });
        });