    
/* ======================================================= 
 *      
 *      ---------------------------------
 *      DATE PICKER CONTENTS
 *      ---------------------------------
 *
 *      [A] DATE PICKER CLASS
 *      [B] DEFAULTS
 *      [C] INIT
 *          [1] SETUP
 *          [2] MAKE FAKE INPUT
 *          [3] OPEN MODAL
 *          [4] INIT DATEPICKER
 *          [5] ADD CONTROLS
 *          [6] ADD SWIPE SUPPORT
 *          [7] CLOSE MODAL
 *          [8] CHANGE VALUE
 *          [9] GET SCROLLBAR WIDTH
 *      [D] DATE PICKER PLUGIN
 *      
 * ======================================================= */

(function( window, $, undefined ){

/* ====================================================================== *
        [A] DATE PICKER IN FULL SCREEN CLASS
 * ====================================================================== */    

    var datePickerTemp = function(container, options){
        this.init(container, options);
    }

/* ====================================================================== *
        [B] DEFAULTS
 * ====================================================================== */    
    
    datePickerTemp.DEFAULTS = {

        // Options

        touchSwipe                  :   true,
        effect                      :   '3', // 1 or 2 or 3 or 5 or 6 up to 16
        blockScroll                 :   true,
        closeOnChange               :   true,
        format                      :   'MMMM DD, YYYY', // YYYY-MM-DD
        additionalTarget            :   '',
        additionalTargetFormat      :   'MMMM DD, YYYY',
        fakeInput                   :   true,
        fakeInputFormat             :   'MMMM DD, YYYY',
        todayWord                   :   'Today',
        clearWord                   :   'Clear',
        cancelWord                  :   'Cancel',
        closeWord                   :   'Select',
        template                    :   ' <div class="dateCalendar-module"> ' +
                                            ' <div class="dateCalendar-container"> ' +
                                                ' <div class="dateCalendar-inner-container"></div> ' +
                                                ' <div class="dateCalendar-nav"> ' +
                                                    '<a class="dateCalendar-close submit-button">{{close}}</a> ' +
                                                ' </div> ' +
                                            ' </div> ' +   
                                        ' </div> '+
                                        ' <div class="dateCalendar-overlay"></div> ',

        // Datepicker options

        datepicker                  :   {
                                            defaultDateSelected         :   false,
                                            calendarWeeks               :   false,
                                            multidate                   :   false,
                                            datesDisabled               :   [],
                                            daysOfWeekDisabled          :   [],
                                            daysOfWeekHighlighted       :   [],
                                            startDate                   :   -Infinity,
                                            endDate                     :   Infinity,
                                            maxViewMode                 :   2, // centuries
                                            minViewMode                 :   0, // days
                                            startView                   :   0, // days
                                            language                    :   'en',
                                            templates                   :   {
                                                                                leftArrow: '&lt;',
                                                                                rightArrow: '&gt;'
                                                                            },
                                            title                       :  '',
                                            todayHighlight              :  false,
                                            weekStart                   :  0, // sunday
                                        },

        // Events

        beforeOpen                  : function(modal, settings){},
        beforeClose                 : function(modal, settings){},
        onChange                    : function(modal, settings){},   

    };    

/* ====================================================================== *
        [C] INIT
 * ====================================================================== */    

    datePickerTemp.prototype.init = function(input, options){   
        
    /* ====================================================================== *
            [1] SETUP
     * ====================================================================== */

        /* SETTINGS */
        
        var settings                    = $jq.extend(true, {}, datePickerTemp.DEFAULTS, options);

        /* VARS */
        
        var $textData                   = $jq(input); 
        var textPlaceholder             = $textData.attr('placeholder') == undefined ? '' : $textData.attr('placeholder');
        var $defaultData                = $jq('<div class="default-input"></div>');
        var docBody                     = $jq(document.body);
        var modal                       = '';
        var datepicker_instance         = '';
        var changedScroll               = false;

        /* Set initial values */

        ChangeDefaultInput( $textData.val() == '' ? textPlaceholder: $textData.val() );
        ChangeTargetVal( $textData.val() == '' ? textPlaceholder: $textData.val() );
        
        /* update fake-input */
        
        this.updateDefaultInput         = function(){
            ChangeDefaultInput( $textData.val() == '' ? textPlaceholder: $textData.val() );
            ChangeTargetVal( $textData.val() == '' ? textPlaceholder: $textData.val() );
        }

        /* Replace words in template */

        settings.template = settings.template.split('{{today}}').join(settings.todayWord);
        settings.template = settings.template.split('{{clear}}').join(settings.clearWord);
        settings.template = settings.template.split('{{close}}').join(settings.closeWord);
        settings.template = settings.template.split('{{cancel}}').join(settings.cancelWord);

    /* ====================================================================== *
            [2] MAKE FAKE INPUT
     * ====================================================================== */         

        if(settings.fakeInput){

            // Add fake input to the DOM

            $defaultData.insertAfter($textData);

            // Add click event6 to fake input

            $defaultData.on('click', function(){
                $textData.trigger('click');
            });
        }

    /* ====================================================================== *
            [3] OPEN MODAL
     * ====================================================================== */    

        $textData.on('click', function(){
            openModal();
        });

        function openModal(){
            // Remove any other modal

            $jq('.dateCalendar-module, .dateCalendar-overlay').remove();

            // New modal template

            modal = $jq(settings.template);

            // Add effect

            if($textData.attr('input-transition') != undefined){
                modal.filter('.dateCalendar-module').addClass('dc-fx-'+$textData.attr('input-transition'))
            }else{
                modal.filter('.dateCalendar-module').addClass('dc-fx-'+settings.effect)
            }

            // Add it to the dom

            docBody.prepend(modal);

            // Add padding-right to docBody (remove scrollbar)

            if( docBody.css('padding-right').split('px').join('') <= 0  && docBody.css('margin-right').split('px').join('') <= 0 && settings.blockScroll){
                docBody.css('padding-right', scrollbarWidthCalc()+'px');
                docBody.addClass('dateCalendarScrollHide');
                changedScroll = true;
            }else{
                changedScroll = false;
            }

            // Init datepicker

            enableDatepicker();

            // Close on BG click
            
            modal.filter('.dateCalendar-overlay').on('click', function(){
                dateCalendarClose();
            });

            // Block scrolling (so the background/body doesn't move/scroll)

            modal.on('touchmove', function(e) {
                return false;
            });
        }

    /* ====================================================================== *
            [4] INIT DATEPICKER
     * ====================================================================== */            

        function enableDatepicker(){

            // Call function beforeOpen

            settings.beforeOpen(modal, settings);

            // Init datepicker plugin

            datepicker_instance = modal.find('.dateCalendar-inner-container').datepicker(settings.datepicker)
                .datepicker('setDate', moment($textData.val(), settings.format).toDate()) 
                .on('changeDate', function(ev){

                    var new_date = moment(ev.date).format(settings.format);

                    InputValChange( new_date );
                    ChangeDefaultInput( new_date );
                    ChangeTargetVal( new_date );

                    // Close 

                    // if(settings.closeOnChange){
                    //     dateCalendarClose();
                    // }
                    
                });   

            if(settings.datepicker.defaultDateSelected){
                modal.find('.dateCalendar-inner-container').datepicker("setDate", settings.datepicker.defaultDateSelected);
            }

            // Show modal with effect

            modal.addClass('dc-visible');

            // Add event controls

            navHandlers();

            // Add swipe support
            //add_swipeSupport();
            enableSwipe();
        }

    /* ====================================================================== *
            [5] ADD CONTROLS
     * ====================================================================== */                

        function navHandlers(){

            // Today

            modal.find('.dateCalendar-today').on('click', function(e){
                e.preventDefault();
                datepicker_instance.datepicker('setDate', moment().toDate());
            });

            // Clear

            modal.find('.dateCalendar-clear').on('click', function(e){
                e.preventDefault();

                InputValChange('');
                ChangeDefaultInput('');
                ChangeTargetVal('');
                dateCalendarClose();
            });

            // Close

            modal.find('.dateCalendar-close').on('click', function(e){
                e.preventDefault();
                $jq("#datepicker_target").show();
                dateCalendarClose();
            });

            // Cancel

            modal.find('.btn-cancel').on('click', function(e){
                e.preventDefault();
                InputValChange('');
                ChangeDefaultInput('');
                ChangeTargetVal('');
                //$jq(".datepicker-container").remove();
                dateCalendarClose();
            });

        }        

    /* ====================================================================== *
            [6] ADD SWIPE SUPPORT
     * ====================================================================== */  
    /* Swipe */
    function enableSwipe(){
        if(settings.touchSwipe){
            modal.find('.dateCalendar-container').swipe( {
                
                //Generic swipe handler for all directions
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if(direction == 'right'){
                        modal.find('.datepicker-inline>div:visible thead .prev').trigger('click');
                    }else if(direction == 'left'){
                        modal.find('.datepicker-inline>div:visible thead .next').trigger('click');
                    }
                }

            });
        }
    } 
    
    /* Swipe end */

    /* ====================================================================== *
            [7] CLOSE MODAL
     * ====================================================================== */                

        function dateCalendarClose(){
            settings.beforeClose(modal, settings);

            modal.removeClass('dc-visible');

            if(changedScroll){
                setTimeout(function(){
                    docBody.css('padding-right', '');
                    docBody.removeClass('dateCalendarScrollHide');
                }, 200);
            }

        }

    /* ====================================================================== *
            [8] CHANGE VALUE
     * ====================================================================== */                        

        function InputValChange(new_date){
            $textData.val(new_date).trigger('input');

            settings.onChange(modal, settings);
        }

        function ChangeDefaultInput(new_date){
            var new_moment  = moment(new_date, settings.format);
            var new_value   = new_moment.isValid() ? new_moment.format(settings.fakeInputFormat) : new_date;

            $defaultData.text( new_value );
        }

        function ChangeTargetVal(new_date){
            var new_moment  = moment(new_date, settings.format);
            var new_value   = new_moment.isValid() ? new_moment.format(settings.fakeInputFormat) : new_date;

            $jq(settings.additionalTarget).val(new_value).text(new_value);
        }

    /* ====================================================================== *
            [9] GET SCROLLBAR WIDTH
     * ====================================================================== */                    

        function scrollbarWidthCalc() {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            // force scrollbars
            outer.style.overflow = "scroll";

            // add innerdiv
            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);        

            var widthWithScroll = inner.offsetWidth;

            // remove divs
            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        }

        
    };//END OF datePickerTemp INIT   

/* ====================================================================== *
        [D] DATE PICKER IN FULL SCREEN PLUGIN
 * ====================================================================== */

    $jq.fn.datePickerTemp = function(options, content, callback) {

        return this.each(function(key, value){
            var $this   = $jq(this);
            var data    = $this.data('datePickerTemp')
            
            // Initialize plugin
            if (!data && typeof options != 'string'){
                $this.data('datePickerTemp', new datePickerTemp(this, options));
            }

            // Call method
            if (data && typeof options == 'string'){
                data[options](content, callback);    
            }
        });

    };      
    
})( window, $jq);