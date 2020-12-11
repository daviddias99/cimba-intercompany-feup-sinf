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
const MOST_RECENT_ORDER_TRIGGER_DOWN = `
    DROP FUNCTION update_most_recent_order_proc
    DROP TRIGGER IF EXISTS update_most_recent_order ON orders
`;

exports.triggersUp = [MOST_RECENT_ORDER_TRIGGER_UP];
exports.triggersDown = [MOST_RECENT_ORDER_TRIGGER_DOWN];
