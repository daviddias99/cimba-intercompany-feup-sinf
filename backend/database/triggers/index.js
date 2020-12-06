const MOST_RECENT_ORDER_TRIGGER_UP = `
    CREATE OR REPLACE FUNCTION update_most_recent_order_proc() RETURNS TRIGGER AS
    $BODY$
    DECLARE
        previous_most_recent timestamp with time zone;
    BEGIN

        SELECT most_recent_order INTO previous_most_recent FROM "companies" WHERE id = NEW.company_id;

        IF NEW.jasmin_created_on > previous_most_recent THEN
            UPDATE "companies" SET most_recent_order = NEW.jasmin_created_on WHERE id = NEW.company_id;
        END IF;

        RETURN NULL;
    END
    $BODY$

    LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS update_most_recent_order ON orders;
    CREATE TRIGGER update_most_recent_order
        AFTER INSERT ON orders
        FOR EACH ROW
        EXECUTE PROCEDURE update_most_recent_order_proc();
`;
const MOST_RECENT_ORDER_TRIGGER_DOWN = `
    DROP FUNCTION update_most_recent_order_proc
`;

exports.triggersUp = [MOST_RECENT_ORDER_TRIGGER_UP];
exports.triggersDown = [MOST_RECENT_ORDER_TRIGGER_DOWN];
