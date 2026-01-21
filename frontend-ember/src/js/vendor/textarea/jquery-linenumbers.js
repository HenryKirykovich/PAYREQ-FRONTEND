(function($){
    $.fn.linenumbers = function(in_opts){
        // Settings and Defaults
        var opt = $.extend({
            col_width: '65px',
            height: '300px',
            start: 1,
            digits: 4.
        },in_opts);
        // Remove existing div and the textarea from previous run
        $("[data-name='linenumbers']").remove();
        // Function run
        return this.each(function(){
            // Get some numbers sorted out for the CSS changes
            var textarea_width = $(this).prop("offsetWidth");
            var textarea_height = $(this).prop("offsetHeight");
            var new_textarea_width = parseInt(textarea_width)-parseInt(opt.col_width);
            // Create the new textarea and style it
            $(this).before('<textarea data-name="linenumbers" style="width:'+new_textarea_width+'px;height:'+textarea_height+'px;float:left;overflow:hidden;padding-right: 7px;border:none;" disabled="disabled"></textarea>');
            // Edit the existing textarea's styles
            $(this).css({'height':textarea_height+'px'});
            // Add a clearing div.
            $(this).after('<div style="clear:both;"></div>');
            // Define a simple variable for the line-numbers box
            var lnbox = $(this).parent().find('textarea[disabled="disabled"]');
            // Bind some actions to all sorts of events that may change it's contents
            $(this).bind('blur focus change keyup keydown contextmenu input',function(){
                // Break apart and regex the lines, everything to spaces sans linebreaks
                var lines = "\n"+$(this).val();
                lines = lines.match(/[^\n]*\n[^\n]*/gi);
                // declare output var
                var line_number_output='';
                // declare spacers and max_spacers vars, and set defaults
                var max_spacers = ''; var spacers = '';
                for(i=0;i<opt.digits;i++){
                    max_spacers += ' ';
                }
                // Loop through and process each line
                $.each(lines,function(k,v){
                    // Add a line if not blank
                    if(k!=0){
                        line_number_output += "\n";
                    }
                    // Determine the appropriate number of leading spaces
                    lencheck = k+opt.start+'!';
                    spacers = max_spacers.substr(lencheck.length-1);
                    // Add the line with out line number, to the output variable
                    line_number_output += spacers+(k+opt.start)+'';
                });
                // Give the text area out modified content.
                $(lnbox).val(line_number_output);
                // Change scroll position as they type, makes sure they stay in sync
                $(lnbox).scrollTop($(this).scrollTop());
            });
            // Lock scrolling together, for mouse-wheel scrolling
            $(this).scroll(function(){
                $(lnbox).scrollTop($(this).scrollTop());
            });

            $(this).css({'height':parseInt(opt.height)+'px', "white-space": "pre"});
            $(lnbox).css({'height':parseInt(opt.height)+'px','width':'60px','text-align': "right"});

            $(this).attr('placeholder').replace(/\\n/g, '\n');

            // Fire it off once to get things started
            $(this).trigger('keyup');
        });
    };
})(jQuery);
$('textarea').linenumbers();