$(function() {

    $(document).on('ready',function(){
        
        $.ajax({
            url: '/autos',
            contentType: 'application/json',
            success: function(response) {
                var select = $('#userAuto');

                select.html('<option value="0">Todos</option>');

                response.autos.forEach(function(auto) {
                    select.append('\
                        <option value="'+ auto.id +'">'+ auto.modelo +'</option>\
                    ');
                });
            }
        });

        $.ajax({
            url: '/autos',
            contentType: 'application/json',
            success: function(response) {
                var select = $('#createUserAuto');

                select.html('');

                response.autos.forEach(function(auto) {
                    select.append('\
                        <option value="'+ auto.id +'">'+ auto.modelo +'</option>\
                    ');
                });
            }
        });
    });

    $('#get-button').on('click', function() {
        $.ajax({
            url: '/autos',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.autos.forEach(function(auto) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + auto.id + '</td>\
                            <td><input type="text" class="modelo" value="' + auto.modelo + '"></td>\
                            <td><input type="text" class="marca" value="' + auto.marca + '"></td>\
                            <td><input type="text" class="year" value="' + auto.year + '"></td>\
                            <td>\
                                <button class="update-button">Actualizar</button>\
                                <button class="delete-button">Borrar</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });

        $.ajax({
            url: '/autos',
            contentType: 'application/json',
            success: function(response) {
                var select = $('#userAuto');

                select.html('<option value="0">Todos</option>');

                response.autos.forEach(function(auto) {
                    select.append('\
                        <option value="'+ auto.id +'">'+ auto.modelo +'</option>\
                    ');
                });
            }
        });

        $.ajax({
            url: '/autos',
            contentType: 'application/json',
            success: function(response) {
                var select = $('#createUserAuto');

                select.html('');

                response.autos.forEach(function(auto) {
                    select.append('\
                        <option value="'+ auto.id +'">'+ auto.modelo +'</option>\
                    ');
                });
            }
        });
    });

    $('#get-user-button').on('click', function() {
        var userAuto = $('#userAuto').val();
        $.ajax({
            url: '/usuarios/'+ userAuto,
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                var htmlmsg = '';

                tbodyEl.html('');
                response.users.forEach(function(user) {
                    htmlmsg = htmlmsg + '\
                        <tr>\
                            <td class="id">' + user.id + '</td>\
                            <td><input type="text" class="rut" value="' + user.rut + '"></td>\
                            <td><input type="text" class="nombre" value="' + user.nombre + '"></td>\
                            <td><select class="auto">';                    
                        response.autos.forEach(function(x) {
                            if(x.id == user.auto){
                                htmlmsg = htmlmsg + '<option value="'+ x.id +'" selected>'+ x.modelo +'</option>';
                            }else{
                                htmlmsg = htmlmsg + '<option value="'+ x.id +'">'+ x.modelo +'</option>';
                            }
                        });                        
                        htmlmsg = htmlmsg + '</select></td>\
                            <td>\
                                <button class="update-user-button">Actualizar</button>\
                                <button class="delete-user-button">Borrar</button>\
                            </td>\
                        </tr>\
                    ';
                });
                tbodyEl.html(htmlmsg);
            }
        });

    });

    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var modeloInput = $('#modelo-input'),
            marcaInput = $('#marca-input'),
            yearInput = $('#year-input');

        $.ajax({
            url: '/autos',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ modelo: modeloInput.val(), marca: marcaInput.val(), year: yearInput.val() }),
            success: function(response) {
                console.log(response);
                modeloInput.val('');
                marcaInput.val('');
                yearInput.val('');
                $('#get-button').click();
            }
        });
    });

    $('#create-user-form').on('submit', function(event) {
        event.preventDefault();

        var rutInput = $('#rut-input'),
            nombreInput = $('#nombre-input'),
            userAuto = $('#createUserAuto');

        $.ajax({
            url: '/usuarios',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ rut: rutInput.val(), nombre: nombreInput.val(), auto: userAuto.val() }),
            success: function(response) {
                console.log(response);
                nombreInput.val('');
                rutInput.val('');
                $('#get-user-button').click();
            }
        });
    });

    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newAutoModelo = rowEl.find('.modelo').val(),
            newAutoMarca = rowEl.find('.marca').val(),
            newAutoYear = rowEl.find('.year').val();

        $.ajax({
            url: '/autos/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newAutoModelo: newAutoModelo, newAutoMarca: newAutoMarca, newAutoYear: newAutoYear }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    $('table').on('click', '.update-user-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newUserRut = rowEl.find('.rut').val(),
            newUserNombre = rowEl.find('.nombre').val(),
            newUserAuto = rowEl.find('.auto').val();

        $.ajax({
            url: '/usuarios/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newUserRut: newUserRut, newUserNombre: newUserNombre, newUserAuto: newUserAuto }),
            success: function(response) {
                console.log(response);
                $('#get-user-button').click();
            }
        });
    });

    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/autos/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    $('table').on('click', '.delete-user-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/usuarios/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-user-button').click();
            }
        });
    });
});
