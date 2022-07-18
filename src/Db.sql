DELIMITER $$
DROP TRIGGER IF EXISTS trigger_categoria$$
CREATE TRIGGER trigger_categoria
AFTER INSERT ON Electrodomesticos FOR EACH ROW
BEGIN
INSERT INTO Categoria(id, nombre, Descripcion) VALUES (NULL, new.Categoria, new.Descripcion);
END$$
DELIMITER ;



DELIMITER $$
DROP TRIGGER IF EXISTS trigger_guardar_usuarios_eliminados$$
CREATE TRIGGER trigger_guardar_usuarios_eliminados
AFTER DELETE ON usuarios FOR EACH ROW
BEGIN
INSERT INTO log_usuarios_eliminados VALUES (NULL, OLD.id, NOW(), OLD.nombre, OLD.apellido1, OLD.apellido2, OLD.usuario );
END$$
DELETE FROM usuarios WHERE id = 4;
SELECT * FROM usuarios;
SELECT * from log_usuarios_eliminados;
DELIMITER ;
