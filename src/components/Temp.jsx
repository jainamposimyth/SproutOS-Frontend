const FeaturesHundredFive = () => {
         const listing = [
          'This comprehensive suite of paym',
          'This comprehensive suite of paym',
          'This comprehensive suite of paym',
          'This comprehensive suite of paym',
          'This comprehensive suite of paym',
          'This comprehensive suite of paym',
        ];
       return (
          <div className="flex flex-col w-full gap-8 p-4 md:p-8">

            <div className="flex flex-wrap items-center justify-center gap-8">
           
              <div className="flex w-full flex-col gap-12 md:w-1/2">
                <div className="flex flex-col gap-4">
                  <h2
                   className="text-3xl font-semibold text-[#0D0D0D] md:text-4xl editable" data-key="">
                   text_1764584948849
                   </h2>
                  <p className="text-base text-[#808080] md:text-lg"> 
                  text_1764585061516
                  </p>
                </div>
      
           
                <div className="flex items-start gap-3">
                  <button
                   className="rounded-md bg-[#3328BF] px-4 py-3 text-white text-base font-semibold hover:bg-[#292099] transition">
                   text_1764585075620
                   </button>
      
                  <button>
                  text_1764585089833
                  </button>
                  
                </div>
              </div>
      
            
              <div className="flex w-full justify-center md:w-1/2">
                <img alt="img" src="https://design.sproutui.com/elementor/wp-content/uploads/sites/2/2024/08/About-Us-66.png" className="max-w-full rounded-md" />
              </div>
            </div>
      

            <div className="flex flex-wrap justify-between gap-8">
              {listing.slice(0, 3).map((data, index) => (
                <div
                  key={index}
                  className="flex flex-auto items-center gap-3 rounded-sm bg-[#F9F9FB] py-3 px-5 md:w-[30%]"
                >
                  <span>
                    <svg
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 6.48926C21.7499 6.48926 26.0107 10.7501 26.0107 16C26.0107 21.2499 21.7499 25.5107 16.5 25.5107C11.2501 25.5107 6.98926 21.2499 6.98926 16C6.98926 10.7501 11.2501 6.48926 16.5 6.48926ZM16.5 7.51074C11.8199 7.51074 8.01074 11.3199 8.01074 16C8.01074 20.6801 11.8199 24.4893 16.5 24.4893C21.1801 24.4893 24.9893 20.6801 24.9893 16C24.9893 11.3199 21.1801 7.51074 16.5 7.51074ZM20.7256 12.6357C20.9245 12.4368 21.2551 12.4368 21.4541 12.6357C21.6531 12.8347 21.6531 13.1555 21.4541 13.3545L14.8643 19.9443C14.6653 20.1433 14.3445 20.1433 14.1455 19.9443L11.5557 17.3545C11.3567 17.1555 11.3567 16.8347 11.5557 16.6357C11.7546 16.4368 12.0754 16.4368 12.2744 16.6357L14.5 18.8613L20.7256 12.6357Z"
                        fill="#808080"
                        stroke="#808080"
                        strokeWidth="0.978261"
                      />
                    </svg>
                  </span>
                  <span
                    className="text-base text-[#808080]"
                  >
                    {data}
                  </span>
                </div>
              ))}
            </div>
      
         
            <div className="flex flex-wrap justify-between gap-8">
              {listing.slice(3, 6).map((data, index) => (
                <div
                  key={index}
                  className="flex flex-auto items-center gap-3 rounded-sm bg-[#F9F9FB] py-3 px-5 md:w-[30%]"
                >
                  <span>
                    <svg
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 6.48926C21.7499 6.48926 26.0107 10.7501 26.0107 16C26.0107 21.2499 21.7499 25.5107 16.5 25.5107C11.2501 25.5107 6.98926 21.2499 6.98926 16C6.98926 10.7501 11.2501 6.48926 16.5 6.48926ZM16.5 7.51074C11.8199 7.51074 8.01074 11.3199 8.01074 16C8.01074 20.6801 11.8199 24.4893 16.5 24.4893C21.1801 24.4893 24.9893 20.6801 24.9893 16C24.9893 11.3199 21.1801 7.51074 16.5 7.51074ZM20.7256 12.6357C20.9245 12.4368 21.2551 12.4368 21.4541 12.6357C21.6531 12.8347 21.6531 13.1555 21.4541 13.3545L14.8643 19.9443C14.6653 20.1433 14.3445 20.1433 14.1455 19.9443L11.5557 17.3545C11.3567 17.1555 11.3567 16.8347 11.5557 16.6357C11.7546 16.4368 12.0754 16.4368 12.2744 16.6357L14.5 18.8613L20.7256 12.6357Z"
                        fill="#808080"
                        stroke="#808080"
                        strokeWidth="0.978261"
                      />
                    </svg>
                  </span>
                  <span
                    className="text-base text-[#808080]"
                  >
                    {data}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      };
      
      export default FeaturesHundredFive;
      