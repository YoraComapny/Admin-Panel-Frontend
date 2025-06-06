const GeneralSettings = ({ data, childFunction }) => {
  return (
    <>
      <div className="w-full flex flex-col gap-2 m-3">
        <h2 className="font-semibold">General Settings</h2>

        <div className="mt-4 flex mx-2 gap-2">
          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">Company Name</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="company_name"
              value={data.company_name}
              onChange={(e) => childFunction(e)}
            />
          </div>

          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">Site Title</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="site_title"
              value={data.site_title}
              onChange={(e) => childFunction(e)}
            />
          </div>
        </div>

        {/* <div className="mt-2 flex mx-2 gap-2">
          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">App Logo Url</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="app_logo_url"
              value={data.app_logo_url}
              onChange={(e) => childFunction(e)}
            />
          </div>

          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">App Icon Url</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="app_icon_url"
              value={data.app_icon_url}
              onChange={(e) => childFunction(e)}
            />
          </div>
        </div> */}

        <div className="mt-2 flex mx-2 gap-2">
          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">Time Zone</label>
            <div className="relative w-[90%] text-xs cursor-pointer">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                name="time_zone"
                value={data.time_zone}
                onChange={(e) => childFunction(e)}
              >
                <option value="">Select One</option>
                <option value="-12">
                  (UTC-12:00) International Date Line West
                </option>
                <option value="-11">
                  (UTC-11:00) Coordinated Universal Time-11
                </option>
                <option value="-10">(UTC-10:00) Hawaii</option>
                <option value="-9">(UTC-09:00) Alaska</option>
                <option value="-7">(UTC-08:00) Baja California</option>
                <option value="-7">
                  (UTC-07:00) Pacific Time (US &amp; Canada)
                </option>
                <option value="-8">
                  (UTC-08:00) Pacific Time (US &amp; Canada)
                </option>
                <option value="-7">(UTC-07:00) Arizona</option>
                <option value="-6">
                  (UTC-07:00) Chihuahua, La Paz, Mazatlan
                </option>
                <option value="-6">
                  (UTC-07:00) Mountain Time (US &amp; Canada)
                </option>
                <option value="-6">(UTC-06:00) Central America</option>
                <option value="-5">
                  (UTC-06:00) Central Time (US &amp; Canada)
                </option>
                <option value="-5">
                  (UTC-06:00) Guadalajara, Mexico City, Monterrey
                </option>
                <option value="-6">(UTC-06:00) Saskatchewan</option>
                <option value="-5">(UTC-05:00) Bogota, Lima, Quito</option>
                <option value="-4">
                  (UTC-05:00) Eastern Time (US &amp; Canada)
                </option>
                <option value="-4">(UTC-05:00) Indiana (East)</option>
                <option value="-4.5">(UTC-04:30) Caracas</option>
                <option value="-4">(UTC-04:00) Asuncion</option>
                <option value="-3">(UTC-04:00) Atlantic Time (Canada)</option>
                <option value="-4">(UTC-04:00) Cuiaba</option>
                <option value="-4">
                  (UTC-04:00) Georgetown, La Paz, Manaus, San Juan
                </option>
                <option value="-4">(UTC-04:00) Santiago</option>
                <option value="-2.5">(UTC-03:30) Newfoundland</option>
                <option value="-3">(UTC-03:00) Brasilia</option>
                <option value="-3">(UTC-03:00) Buenos Aires</option>
                <option value="-3">(UTC-03:00) Cayenne, Fortaleza</option>
                <option value="-3">(UTC-03:00) Greenland</option>
                <option value="-3">(UTC-03:00) Montevideo</option>
                <option value="-3">(UTC-03:00) Salvador</option>
                <option value="-2">
                  (UTC-02:00) Coordinated Universal Time-02
                </option>
                <option value="-1">(UTC-02:00) Mid-Atlantic - Old</option>
                <option value="0">(UTC-01:00) Azores</option>
                <option value="-1">(UTC-01:00) Cape Verde Is.</option>
                <option value="1">(UTC) Casablanca</option>
                <option value="0">(UTC) Coordinated Universal Time</option>
                <option value="0">(UTC) Edinburgh, London</option>
                <option value="1">(UTC+01:00) Edinburgh, London</option>
                <option value="1">(UTC) Dublin, Lisbon</option>
                <option value="0">(UTC) Monrovia, Reykjavik</option>
                <option value="2">
                  (UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
                </option>
                <option value="2">
                  (UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
                </option>
                <option value="2">
                  (UTC+01:00) Brussels, Copenhagen, Madrid, Paris
                </option>
                <option value="2">
                  (UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb
                </option>
                <option value="1">(UTC+01:00) West Central Africa</option>
                <option value="1">(UTC+01:00) Windhoek</option>
                <option value="3">(UTC+02:00) Athens, Bucharest</option>
                <option value="3">(UTC+02:00) Beirut</option>
                <option value="2">(UTC+02:00) Cairo</option>
                <option value="3">(UTC+02:00) Damascus</option>
                <option value="3">(UTC+02:00) E. Europe</option>
                <option value="2">(UTC+02:00) Harare, Pretoria</option>
                <option value="3">
                  (UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
                </option>
                <option value="3">(UTC+03:00) Istanbul</option>
                <option value="3">(UTC+02:00) Jerusalem</option>
                <option value="2">(UTC+02:00) Tripoli</option>
                <option value="3">(UTC+03:00) Amman</option>
                <option value="3">(UTC+03:00) Baghdad</option>
                <option value="3">(UTC+02:00) Kaliningrad</option>
                <option value="3">(UTC+03:00) Kuwait, Riyadh</option>
                <option value="3">(UTC+03:00) Nairobi</option>
                <option value="3">
                  (UTC+03:00) Moscow, St. Petersburg, Volgograd, Minsk
                </option>
                <option value="4">
                  (UTC+04:00) Samara, Ulyanovsk, Saratov
                </option>
                <option value="4.5">(UTC+03:30) Tehran</option>
                <option value="4">(UTC+04:00) Abu Dhabi, Muscat</option>
                <option value="5">(UTC+04:00) Baku</option>
                <option value="4">(UTC+04:00) Port Louis</option>
                <option value="4">(UTC+04:00) Tbilisi</option>
                <option value="4">(UTC+04:00) Yerevan</option>
                <option value="4.5">(UTC+04:30) Kabul</option>
                <option value="5">(UTC+05:00) Ashgabat, Tashkent</option>
                <option value="5">(UTC+05:00) Yekaterinburg</option>
                <option value="5">(UTC+05:00) Islamabad, Karachi</option>
                <option value="5.5">
                  (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                </option>
                <option value="5.5">(UTC+05:30) Sri Jayawardenepura</option>
                <option value="5.75">(UTC+05:45) Kathmandu</option>
                <option value="6">(UTC+06:00) Nur-Sultan (Astana)</option>
                <option value="6">(UTC+06:00) Dhaka</option>
                <option value="6.5">(UTC+06:30) Yangon (Rangoon)</option>
                <option value="7">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
                <option value="7">(UTC+07:00) Novosibirsk</option>
                <option value="8">
                  (UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi
                </option>
                <option value="8">(UTC+08:00) Krasnoyarsk</option>
                <option value="8">(UTC+08:00) Kuala Lumpur, Singapore</option>
                <option value="8">(UTC+08:00) Perth</option>
                <option value="8">(UTC+08:00) Taipei</option>
                <option value="8">(UTC+08:00) Ulaanbaatar</option>
                <option value="8">(UTC+08:00) Irkutsk</option>
                <option value="9">(UTC+09:00) Osaka, Sapporo, Tokyo</option>
                <option value="9">(UTC+09:00) Seoul</option>
                <option value="9.5">(UTC+09:30) Adelaide</option>
                <option value="9.5">(UTC+09:30) Darwin</option>
                <option value="10">(UTC+10:00) Brisbane</option>
                <option value="10">
                  (UTC+10:00) Canberra, Melbourne, Sydney
                </option>
                <option value="10">(UTC+10:00) Guam, Port Moresby</option>
                <option value="10">(UTC+10:00) Hobart</option>
                <option value="9">(UTC+09:00) Yakutsk</option>
                <option value="11">
                  (UTC+11:00) Solomon Is., New Caledonia
                </option>
                <option value="11">(UTC+11:00) Vladivostok</option>
                <option value="12">(UTC+12:00) Auckland, Wellington</option>
                <option value="12">
                  (UTC+12:00) Coordinated Universal Time+12
                </option>
                <option value="12">(UTC+12:00) Fiji</option>
                <option value="12">(UTC+12:00) Magadan</option>
                <option value="13">
                  (UTC+12:00) Petropavlovsk-Kamchatsky - Old
                </option>
                <option value="13">(UTC+13:00) Nukualofa</option>
                <option value="13">(UTC+13:00) Samoa</option>
              </select>
              <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">Language</label>
            <div className="relative w-[90%] text-xs cursor-pointer">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                name="language"
                value={data.language}
                onChange={(e) => childFunction(e)}
              >
                <option value="english">English</option>
                <option value="german">German</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
                <option value="italian">Italian</option>
                <option value="dutch">Dutch</option>
                <option value="portugese">Portuguese</option>
                <option value="norwegian">Norwegian</option>
                <option value="russian">Russian</option>
                <option value="danish">Danish</option>
                <option value="arabic">Arabic</option>
                <option value="hindi">Hindi</option>
                <option value="urdu">Urdu</option>
              </select>
              <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralSettings;
