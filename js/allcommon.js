//Used to toggle navmenu
$("#toggleBtn").each(function () {
  const toggleButton = $(this);
  const toggleIcon = toggleButton.find("i");

  toggleButton.attr({
    "aria-expanded": "false",
    "aria-label": "Open navigation menu",
    title: "Open navigation menu",
  });

  toggleButton.on("click", function () {
    const navigationFrame = $("#navframe");
    const isOpening = !navigationFrame.is(":visible");

    navigationFrame.toggle(isOpening);
    toggleButton.toggleClass("is-open", isOpening).attr({
      "aria-expanded": String(isOpening),
      "aria-label": isOpening
        ? "Close navigation menu"
        : "Open navigation menu",
      title: isOpening ? "Close navigation menu" : "Open navigation menu",
    });
    toggleIcon
      .toggleClass("fa-bars", !isOpening)
      .toggleClass("fa-xmark", isOpening);
  });
});

// ______________dynamic content_____________
//______Beauty_______
$(".beautyAuthor").html("NANDISH");
$(".beautyDays").html("1 month");
$(".beautySponsor").html("<b>NOT SPONSORED</b>");
$(".beautyRecommendation").html("<b>NANDISH</b>");

//______Mobiles_______
$(".mobileAuthor").html("NANDISH");
$(".mobileDays").html("1 Month");
$(".mobileSponsor").html("<b>NOT SPONSORED</b>");
$(".mobileRecommendation").html("<b>NANDISH</b>");

//______Laptops_______
$(".laptopAuthor").html("NANDISH");
$(".laptopDays").html("1 Month");
$(".laptopSponsor").html("<b>NOT SPONSORED</b>");
$(".laptopRecommendation").html("<b>NANDISH</b>");

//______Desktop_______
$(".desktopAuthor").html("NANDISH");
$(".desktopDays").html("1 Month");
$(".desktopSponsor").html("<b>NOT SPONSORED</b>");
$(".desktopRecommendation").html("<b>NANDISH</b>");

//______Food_______
$(".foodAuthor").html("NANDISH");
$(".foodDays").html("1 month");
$(".foodSponsor").html("<b>NOT SPONSORED</b>");
$(".foodRecommendation").html("<b>NANDISH</b>");

//______Gadgets_______
$(".gadgetAuthor").html("NANDISH");
$(".gadgetDays").html("1 Month");
$(".gadgetSponsor").html("<b>NOT SPONSORED</b>");
$(".gadgetRecommendation").html("<b>NANDISH</b>");

//______Camera_______
$(".cameraAuthor").html("NANDISH");
$(".cameraDays").html("1 Month");
$(".cameraSponsor").html("<b>NOT SPONSORED</b>");
$(".cameraRecommendation").html("<b>NANDISH</b>");

//______scooter_______
$(".scooterAuthor").html("NANDISH");
$(".scooterDays").html("1 Month");
$(".scooterSponsor").html("<b>NOT SPONSORED</b>");
$(".scooterRecommendation").html("<b>NANDISH</b>");

//______bike_______
$(".bikeAuthor").html("NANDISH");
$(".bikeDays").html("1 Month");
$(".bikeSponsor").html("<b>NOT SPONSORED</b>");
$(".bikeRecommendation").html("<b>NANDISH</b>");

//________Nutrition________
$(".nutriAuthor").html("NANDISH");
$(".nutriDays").html("1 Month");
$(".nutriSponsor").html("<b>NOT SPONSORED</b>");

//_______Youtubers______
$(".tubeAuthor").html("NANDISH");
$(".tubeDays").html("1 Month");
$(".tubeSponsor").html("<b>NOT SPONSORED</b>");

//________DIET_Plans________
$(".dietAuthor").html("NANDISH");
$(".dietDays").html("1 Month");
$(".dietSponsor").html("<b>NOT SPONSORED</b>");

//________vastu________
$(".vastuAuthor").html("NANDISH");
$(".vastuDays").html("1 Month");
$(".vastuSponsor").html("<b>NOT SPONSORED</b>");

//________Ayurveda________
$(".ayurAuthor").html("NANDISH");
$(".ayurDays").html("1 Month");
$(".ayurSponsor").html("<b>NOT SPONSORED</b>");

//________Yoga________
$(".yogaAuthor").html("NANDISH");
$(".yogaDays").html("1 Month");
$(".yogaSponsor").html("<b>NOT SPONSORED</b>");

//________Coding________
$(".codingAuthor").html("NANDISH");
$(".codingDays").html("1 Month");
$(".codingSponsor").html("<b>NOT SPONSORED</b>");

//________OurServices________
$(".serviceAuthor").html("NANDISH");
$(".serviceDays").html("1 Month");
$(".serviceSponsor").html("<b>NOT SPONSORED</b>");

//________BestServices________
$(".bestServiceAuthor").html("NANDISH");
$(".bestServiceDays").html("1 Month");
$(".bestServiceSponsor").html("<b>NOT SPONSORED</b>");

//________LearningService________
$(".learningPlatformAuthor").html("NANDISH");
$(".learningPlatformDays").html("1 Month");
$(".learningPlatformSponsor").html("<b>NOT SPONSORED</b>");

//________Best Movies________
$(".movieAuthor").html("NANDISH");
$(".movieDays").html("1 Month");
$(".movieSponsor").html("<b>NOT SPONSORED</b>");

//________Best Games________
$(".gameAuthor").html("NANDISH");
$(".gameDays").html("1 Month");
$(".gameSponsor").html("<b>NOT SPONSORED</b>");

//________Stocks________
$(".stockAuthor").html("NANDISH");
$(".stockDays").html("1 Month");
$(".stockSponsor").html("<b>NOT SPONSORED</b>");

//________Daily Updates________
$(".updatesAuthor").html("NANDISH");
$(".updatesDays").html("1 Month");
$(".updatesSponsor").html("<b>NOT SPONSORED</b>");

//________Defence Updates________
$(".defenceAuthor").html("NANDISH");
$(".defenceDays").html("1 Month");
$(".defenceSponsor").html("<b>NOT SPONSORED</b>");
