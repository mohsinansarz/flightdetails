$(document).ready(function () {

    $('.myYear').click(function () {
        var myYear = $(this).html();
        func(myYear);
    });
    
    const func = (year) => {
        var data = document.getElementById('cards');
        var year_url = '';
    if(year > 0){
        year_url = "&launch_year=" + year;
    }
        fetch("https://api.spacexdata.com/v3/launches?limit=100"+year_url).then((apiData) => {
            //console.log(apiData)
            return apiData.json()
        }).then((actualData) => {
            if (actualData) {
                hideloader();
            }
            //console.log(actualData);
            data.innerHTML = '';
            actualData.forEach((flightData) => {

                //console.log(flightData)
                data.innerHTML += `
        <div class="col-sm-12 col-md-6 col-lg-3 mb-4">
        <div class="card w-100">
        <img src="${flightData.links.mission_patch}" class="card-img-top image p-2" alt="">
        <div class="card-body p-0">
            <h5 class="card-title text-center py-2 m-0">${flightData.mission_name} #${flightData.flight_number}</h5>
            <ul class="list-group">
                <li class="border-right-0 border-left-0 p-2 rounded-0 list-group-item d-flex justify-content-between align-items-center">
                    Mission Ids
                  <span class="badge badge-primary badge-pill" >${flightData.mission_id}</span>
                </li>
                <li class="border-right-0 border-left-0 p-2 rounded-0 list-group-item d-flex justify-content-between align-items-center">
                    Launch Year
                  <span class="badge badge-primary badge-pill" >${flightData.launch_year}</span>
                </li>
                <li class="border-right-0 border-left-0 p-2 rounded-0 list-group-item d-flex justify-content-between align-items-center">
                    Successfull Launch
                  <span class="badge badge-primary badge-pill" >${flightData.launch_success}</span>
                </li>
                <li class="border-right-0 border-left-0 border-bottom-0 p-2 rounded-0 list-group-item d-flex justify-content-between align-items-center">
                    Successfull Landing 
                  <span class="badge badge-primary badge-pill" >${flightData.rocket.first_stage.cores[0].land_success}</span>
                </li>
              </ul>
        </div>
        </div>
        `
            })
        })
            .catch((error) => {
                console.log(`The Error: ${error}`)
            })
        function hideloader() {
            document.getElementById('loading').style.display = 'none';
        }
    }

    func(0);
});
$(window).scroll(function(){
    if ($(this).scrollTop() > 400) {
        $('.myFilter').addClass('fixed');
    } else {
        $('.myFilter').removeClass('fixed');
    }
});

