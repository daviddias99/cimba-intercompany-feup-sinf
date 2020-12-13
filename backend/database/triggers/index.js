const MOST_RECENT_ORDER_TRIGGER_UP = `
    CREATE OR REPLACE FUNCTION update_most_recent_order_proc() RETURNS TRIGGER AS
    $BODY$
    DECLARE
        previous_most_recent timestamp with time zone;
    BEGIN
        SELECT most_recent_order INTO previous_most_recent FROM "companies" WHERE id = NEW.ic_id FOR UPDATE;

        IF NEW.created_on > previous_most_recent THEN
            UPDATE "companies" SET most_recent_order = NEW.created_on WHERE id = NEW.ic_id;
        END IF;

        RETURN NEW;
    END
    $BODY$

    LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS update_most_recent_order ON orders;
    CREATE TRIGGER update_most_recent_order
        BEFORE INSERT ON orders
        FOR EACH ROW WHEN (NEW.type = 'purchase' or NEW.type = 'return_purchase')
        EXECUTE PROCEDURE update_most_recent_order_proc();
`;

const DELETE_MAPS_FOR_COMPANY_TRIGGER_UP = `
    CREATE OR REPLACE FUNCTION delete_maps_for_company_proc() RETURNS TRIGGER AS
    $BODY$
    BEGIN
        DELETE FROM item_maps WHERE ic_id = OLD.ic_id AND map_ic_id = OLD.map_ic_id;
        DELETE FROM item_maps WHERE ic_id = OLD.map_ic_id AND map_ic_id = OLD.ic_id;

        RETURN NULL;
    END
    $BODY$

    LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS delete_maps_for_company ON company_maps;
    CREATE TRIGGER delete_maps_for_company
        AFTER DELETE ON company_maps
        FOR EACH ROW
        EXECUTE PROCEDURE delete_maps_for_company_proc();
`;

const MOST_RECENT_ORDER_TRIGGER_DOWN = `
    DROP FUNCTION update_most_recent_order_proc
    DROP TRIGGER IF EXISTS update_most_recent_order ON orders
`;

const DELETE_MAPS_FOR_COMPANY_TRIGGER_DOWN = `
    DROP FUNCTION delete_maps_for_company_proc
    DROP TRIGGER IF EXISTS delete_maps_for_company ON company_maps
`;

exports.triggersUp = [MOST_RECENT_ORDER_TRIGGER_UP, DELETE_MAPS_FOR_COMPANY_TRIGGER_UP];
exports.triggersDown = [MOST_RECENT_ORDER_TRIGGER_DOWN, DELETE_MAPS_FOR_COMPANY_TRIGGER_DOWN];
