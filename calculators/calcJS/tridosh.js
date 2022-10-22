
        $(document).ready(function() {
            $(".calcsubmit").click(function() {
                var vata = 0;
                var pitta = 0;
                var kapha = 0;

                $("#disclaimer").css("display","block");
                $("#tridoshSolutions").css("display","block");
                var anger = $('input:radio[name=anger]:checked').val();
                if (anger == "high") {
                    pitta = pitta + 1;
                    $("#angerStrDisplay").css("display", "block");
                }
                if (anger == "medium") {
                    vata = vata + 1;
                }
                if (anger == "low") {
                    kapha = kapha + 1;
                }

                var sleep = $('input:radio[name=sleep]:checked').val();
                if (sleep == "high") {
                    kapha = kapha + 1;
                }
                if (sleep == "medium") {
                    pitta = pitta + 1;
                    $("#sleepStrDisplay").css("display", "block");
                }
                if (sleep == "low") {
                    vata = vata + 1;
                    $("#sleepStrDisplay").css("display", "block");
                }

                var jointpain = $('input:radio[name=jointpain]:checked').val();
                if (jointpain == "high") {
                    vata = vata + 1;
                    $("#jointStrDisplay").css("display", "block");
                }
                if (jointpain == "medium") {
                    pitta = pitta + 1;
                    $("#jointStrDisplay").css("display", "block");
                }
                if (jointpain == "low") {
                    kapha = kapha + 1;
                }

                var acidity = $('input:radio[name=acidity]:checked').val();
                if (acidity == "high") {
                    pitta = pitta + 1;
                }
                if (acidity == "medium") {
                    kapha = kapha + 1;
                }
                if (acidity == "low") {
                    vata = vata + 1;
                }

                var skinproblem = $('input:radio[name=skinproblem]:checked').val();
                if (skinproblem == "high") {
                    pitta = pitta + 1;
                    $("#skinStrDisplay").css("display", "block");
                }
                if (skinproblem == "medium") {
                    kapha = kapha + 1;
                }
                if (skinproblem == "low") {
                    vata = vata + 1;
                }

                var sweat = $('input:radio[name=sweat]:checked').val();
                if (sweat == "high") {
                    kapha = kapha + 1;
                }
                if (sweat == "medium") {
                    pitta = pitta + 1;
                }
                if (sweat == "low") {
                    vata = vata + 1;
                }

                var sweatsmell = $('input:radio[name=sweatsmell]:checked').val();
                if (sweatsmell == "Bad") {
                    kapha = kapha + 1;
                }
                if (sweatsmell == "VeryBad") {
                    pitta = pitta + 1;
                }
                if (sweatsmell == "low") {
                    vata = vata + 1;
                }

                var thoughts = $('input:radio[name=thoughts]:checked').val();
                if (thoughts == "high") {
                    vata = vata + 1;
                    $("#depressionStrDisplay").css("display", "block");
                }
                if (thoughts == "medium") {
                    pitta = pitta + 1;
                }
                if (thoughts == "low") {
                    kapha = kapha + 1;
                }

                var skinType = $('input:radio[name=skinType]:checked').val();
                if (skinType == "dry") {
                    vata = vata + 1;
                }
                if (skinType == "oily") {
                    kapha = kapha + 1;
                    $("#skinTypeStrDisplay").css("display", "block");
                }

                var digestion = $('input:radio[name=digestion]:checked').val();
                if (digestion == "high") {
                    pitta = pitta + 1;
                }
                if (digestion == "medium") {
                    vata = vata + 1;
                }
                if (digestion == "low") {
                    kapha = kapha + 1;
                    $("#digestionStrDisplay").css("display", "block");
                }

                var water = $('input:radio[name=water]:checked').val();
                if (water == "high") {
                    pitta = pitta + 1;
                }
                if (water == "medium") {
                    kapha = kapha + 1;
                }
                if (water == "low") {
                    vata = vata + 1;
                }

                var depressed = $('input:radio[name=depressed]:checked').val();
                if (depressed == "high") {
                    vata = vata + 1;
                    $("#depressionStrDisplay").css("display", "block");
                }
                if (depressed == "medium") {
                    pitta = pitta + 1;
                }
                if (depressed == "low") {
                    kapha = kapha + 1;
                }

                var fat = $('input:radio[name=fat]:checked').val();
                if (fat == "high") {
                    kapha = kapha + 1;
                }
                if (fat == "medium") {
                    pitta = pitta + 1;
                }
                if (fat == "low") {
                    vata = vata + 1;
                }

                var urine = $('input:radio[name=urine]:checked').val();
                if (urine == "bad") {
                    pitta = pitta + 1;
                }
                if (urine == "medium") {
                    kapha = kapha + 1;
                }
                if (urine == "low") {
                    vata = vata + 1;
                }

                var work = $('input:radio[name=work]:checked').val();
                if (work == "quick") {
                    vata = vata + 1;
                }
                if (work == "medium") {
                    pitta = pitta + 1;
                }
                if (work == "slow") {
                    kapha = kapha + 1;
                }

                var season = $('input:radio[name=season]:checked').val();
                if (season == "summer") {
                    vata = vata + 1;
                }
                if (season == "winter") {
                    kapha = kapha + 1;
                    pitta = pitta + 1;
                }


                var heart = $('input:radio[name=heart]:checked').val();
                if (heart == "yes") {
                    $("#heartStrDisplay").css("display", "block");
                }
                var kidney = $('input:radio[name=kidney]:checked').val();
                if (kidney == "yes") {
                    $("#kidneyStrDisplay").css("display", "block");
                }
                var lungs = $('input:radio[name=lungs]:checked').val();
                if (lungs == "yes") {
                    $("#lungsStrDisplay").css("display", "block");
                }
                var eyes = $('input:radio[name=eye]:checked').val();
                if (eyes == "yes") {
                    $("#eyeStrDisplay").css("display", "block");
                }

                var age = $('#age').val();
                if (age > 1 && age <= 14) {
                    kapha = kapha + 1;
                }
                if (age > 14 && age < 40) {
                    pitta = pitta + 1;
                }
                if (age > 40 && age < 100) {
                    vata = vata + 1;
                }


                console.log(pitta + "" + kapha + "" + vata);
                var total = vata + pitta + kapha;
                var eachVal = 100 / total;
                var vatapercent = vata * eachVal;
                var pittapercent = pitta * eachVal;
                var kaphapercent = kapha * eachVal;

                $(".kapha").html(kaphapercent.toFixed(0) + "%");
                $(".pitta").html(pittapercent.toFixed(0) + "%");
                $(".vata").html(vatapercent.toFixed(0) + "%");

                var weightloss = $('input:radio[name=weightloss]:checked').val();
                var weightgain = $('input:radio[name=weightgain]:checked').val();
                
                if (weightloss == "yes" && weightgain == "no" && kapha > vata && kapha > pitta && vata == pitta) {
                    $("#dpKapha1").css("display", "block");
                    $("#dpKapha2").css("display", "block");
                    $("#dpKapha3").css("display", "block");
                }
                if (weightloss == "yes" && weightgain == "no" && kapha > vata && kapha > pitta && pitta > vata) {
                    $("#dpKaphaPitta1").css("display", "block");
                    $("#dpKaphaPitta2").css("display", "block");
                    $("#dpKaphaPitta3").css("display", "block");
                }
                if (weightloss == "yes" && weightgain == "no" && kapha > vata && kapha > pitta && vata > pitta) {
                    $("#dpKaphaVata1").css("display", "block");
                    $("#dpKaphaVata2").css("display", "block");
                    $("#dpKaphaVata3").css("display", "block");
                }

                if (weightloss == "yes" && weightgain == "no" && pitta > vata && pitta > kapha) {
                    $("#dpKaphaPitta1").css("display", "block");
                    $("#dpKaphaPitta2").css("display", "block");
                    $("#dpKaphaPitta3").css("display", "block");
                }

                if (weightloss == "yes" && weightgain == "no" && vata > pitta && vata > kapha) {
                    $("#dpKaphaVata1").css("display", "block");
                    $("#dpKaphaVata2").css("display", "block");
                    $("#dpKaphaVata3").css("display", "block");
                }

                var diabetes = $('input:radio[name=diabetes]:checked').val();
                if (weightloss == "yes" && weightgain == "no" && kapha > vata && kapha > pitta && vata == pitta && diabetes=="yes") {
                    $("#dpKaphaDiab1").css("display", "block");
                    $("#dpKaphaDiab2").css("display", "block");
                }
                if (weightloss == "yes" && weightgain == "no" &&  kapha > vata && kapha > pitta && pitta > vata && diabetes=="yes") {
                    $("#dpKaphaPittaDiab1").css("display", "block");
                    $("#dpKaphaPittaDiab2").css("display", "block");
                }
                if (weightloss == "yes" && weightgain == "no" && kapha > vata && kapha > pitta && vata > pitta && diabetes=="yes") {
                    $("#dpKaphaVataDiab1").css("display", "block");
                    $("#dpKaphaVataDiab2").css("display", "block");
                }

                if (weightloss == "yes" && weightgain == "no" && pitta > vata && pitta > kapha && diabetes=="yes") {
                    $("#dpKaphaPittaDiab1").css("display", "block");
                    $("#dpKaphaPittaDiab2").css("display", "block");
                }

                if (weightloss == "yes" && weightgain == "no" && vata > pitta && vata > kapha && diabetes=="yes") {
                    $("#dpKaphaVataDiab1").css("display", "block");
                    $("#dpKaphaVataDiab2").css("display", "block");
                }
                
                if (weightgain == "yes" && weightloss == "no" && vata > kapha && vata > pitta) {
                    $("#dpVata1").css("display", "block");
                    $("#dpVata2").css("display", "block");
                    $("#dpVata3").css("display", "block");
                }
                if (weightgain == "yes" && weightloss == "no" && pitta > vata && pitta > kapha) {
                    $("#dpPitta1").css("display", "block");
                    $("#dpPitta2").css("display", "block");
                    $("#dpPitta3").css("display", "block");
                }

            });
        });